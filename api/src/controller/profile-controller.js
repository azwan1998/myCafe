// profile-controller.js
import profileService from '../service/profile-service.js';
import { uploadProfileFoto } from '../service/profile-service.js';
import { ResponseError } from '../error/response-error.js';

const addOrUpdate = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    
    uploadProfileFoto.single('foto')(req, res, async (err) => {
      if (err) {
        return next(new ResponseError(400, err.message));
      }

      const request = {
        id_user: userId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        alamat:req.body.alamat,
        foto:  req.file ? req.file.filename : undefined,
      };

      const result = await profileService.createOrUpdate(request);

      res.status(200).json({ data: result });
    });
  } catch (e) {
    next(e);
  }
};

const showProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const request = {
      id_user: userId,
    };

    const result = await profileService.showProfile(request);

    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export default {
  addOrUpdate,
  showProfile,
};
