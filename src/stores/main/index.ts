import { action } from 'mobx';

class MainStore {
  @action
  async getData() {
    return 1111;
  }

  api() {
    return {

    }
  }
}

export default MainStore;