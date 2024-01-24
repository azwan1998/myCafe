import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { addProfileValidaton, showProfileValidation } from "../validation/profile-validation.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/profiles");
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const uploadProfileFoto = multer({ storage: storage });

const createOrUpdate = async (request) => {
  try {
    const profileData = validate(addProfileValidaton, request);

    const checkProfile = await prismaClient.profile.findFirst({
      where: {
        id_user: profileData.id_user,
      },
      select: {
        id: true,
        foto: true,
      },
    });

    if (!checkProfile) {
      const newProfile = await prismaClient.profile.create({
        data: profileData,
        select: {
          id: true,
          id_user: true,
          name: true,
          email: true,
          phone: true,
          foto: true,
          alamat: true,
        },
      });

      return newProfile;
    } else {
      if (request.foto !== undefined) {
        await prismaClient.profile.update({
          where: {
            id: checkProfile.id,
          },
          data: {
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            foto: request.foto,
            alamat: profileData.alamat,
          },
          select: {
            id: true,
            id_user: true,
            name: true,
            email: true,
            phone: true,
            foto: true,
          },
        });

        if (checkProfile.foto) {
          const oldfotoPath = path.join(process.cwd(), "public/uploads/profiles", checkProfile.foto);

          await fs.unlink(oldfotoPath);
        }
      } else {
        const updatedProfile = await prismaClient.profile.update({
          where: {
            id: checkProfile.id,
          },
          data: {
            name: profileData.name,
            email: profileData.email,
            phone: profileData.phone,
            alamat: profileData.alamat,
          },
          select: {
            id: true,
            id_user: true,
            name: true,
            email: true,
            phone: true,
            foto: true,
          },
        });

        return updatedProfile;
      }
    }
  } catch (error) {
    throw new ResponseError(400, error.message);
  }
};

const showProfile = async (request) => {
  const profile = validate(showProfileValidation, request);

  const checkProfile = await prismaClient.profile.count({
    where: {
      id_user: profile.id_user,
    },
    select : {
      id : true,
    }
  });

  if (!checkProfile) {
    return [];
  }

  const result = await prismaClient.profile.findFirst({
    where: {
      id_user: checkProfile.id_user,
    },
    select:{
      id : true,
      name : true,
      email : true,
      phone : true,
      alamat : true,
      foto: true,
      user: {
        select: {
          id : true,
          username: true,
        }
      }
    }
  });

  if (result && result.foto) {
    result.foto = `${process.env.BASE_URL}/uploads/profiles/${result.foto}`;
  }
  
  return result;

};


export { uploadProfileFoto };
export default {
  createOrUpdate,
  showProfile,
};
