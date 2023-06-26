import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
      getFighters() {
        return fighterRepository.getAll();
      }

      getFighterById(id) {
        return fighterRepository.getOne({ id });
      }

      createFighter(data) {
        return fighterRepository.create(data);
      }

      updateFighter(id, data) {
          return fighterRepository.update(id, data);
      }

      deleteFighter(id) {
          return fighterRepository.delete(id);
      }

      search(search) {
          const item = fighterRepository.getOne(search);
          if (!item) {
              return null;
          }
          return item;
      }
}

const fighterService = new FighterService();

export { fighterService };
