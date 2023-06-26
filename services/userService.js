import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
      getUsers() {
        return userRepository.getAll();
      }

      getUserById(id) {
          return userRepository.getOne({ id });
      }

      createUser(data) {
          return userRepository.create(data);
      }

      updateUser(id, data) {
          return userRepository.update(id, data);
      }

      deleteUser(id) {
          return userRepository.delete(id);
      }

      search(search) {
        const item = userRepository.getOne(search);
        if (!item) {
          return null;
        }
        return item;
      }
}

const userService = new UserService();

export { userService };
