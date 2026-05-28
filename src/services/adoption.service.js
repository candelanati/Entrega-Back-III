import mongoose from 'mongoose';
import { AdoptionRepository } from '../repositories/adoption.repository.js';
import { PetRepository } from '../repositories/pet.repository.js';
import { UserRepository } from '../repositories/user.repository.js';

const normalizePetIds = (pets = []) => pets.map((pet) => String(pet._id ?? pet));

export class AdoptionService {
  constructor({
    adoptionRepository = new AdoptionRepository(),
    petRepository = new PetRepository(),
    userRepository = new UserRepository()
  } = {}) {
    this.adoptionRepository = adoptionRepository;
    this.petRepository = petRepository;
    this.userRepository = userRepository;
  }

  validateObjectId(id, label = 'id') {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error(`${label} invalido`);
      error.statusCode = 400;
      throw error;
    }
  }

  async getAllAdoptions() {
    return this.adoptionRepository.getAll();
  }

  async getAdoptionById(adoptionId) {
    this.validateObjectId(adoptionId, 'id de adopcion');
    return this.adoptionRepository.getBy({ _id: adoptionId });
  }

  async createAdoption(userId, petId) {
    this.validateObjectId(userId, 'id de usuario');
    this.validateObjectId(petId, 'id de mascota');

    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      const error = new Error('Usuario no encontrado');
      error.statusCode = 404;
      throw error;
    }

    const pet = await this.petRepository.getBy({ _id: petId });
    if (!pet) {
      const error = new Error('Mascota no encontrada');
      error.statusCode = 404;
      throw error;
    }

    if (pet.adopted) {
      const error = new Error('La mascota ya esta adoptada');
      error.statusCode = 400;
      throw error;
    }

    const currentPets = normalizePetIds(user.pets);
    const updatedPets = currentPets.includes(String(pet._id))
      ? user.pets
      : [...(user.pets ?? []), pet._id];

    await this.userRepository.update(user._id, { pets: updatedPets });
    await this.petRepository.update(pet._id, { adopted: true, owner: user._id });

    const adoption = await this.adoptionRepository.create({ owner: user._id, pet: pet._id });
    return adoption.toObject ? adoption.toObject() : adoption;
  }
}

export const adoptionService = new AdoptionService();
