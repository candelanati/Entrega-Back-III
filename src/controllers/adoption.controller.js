export class AdoptionController {
  constructor(adoptionService) {
    this.adoptionService = adoptionService;
  }

  getAllAdoptions = async (_req, res, next) => {
    try {
      const adoptions = await this.adoptionService.getAllAdoptions();
      res.status(200).json({ status: 'success', payload: adoptions });
    } catch (error) {
      next(error);
    }
  };

  getAdoption = async (req, res, next) => {
    try {
      const adoption = await this.adoptionService.getAdoptionById(req.params.aid);
      if (!adoption) {
        return res.status(404).json({ status: 'error', error: 'Adopcion no encontrada' });
      }

      return res.status(200).json({ status: 'success', payload: adoption });
    } catch (error) {
      return next(error);
    }
  };

  createAdoption = async (req, res, next) => {
    try {
      const adoption = await this.adoptionService.createAdoption(req.params.uid, req.params.pid);
      res.status(201).json({ status: 'success', message: 'Mascota adoptada', payload: adoption });
    } catch (error) {
      next(error);
    }
  };
}
