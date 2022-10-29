import { configure } from 'mobx';
import MainStore from './main';

configure({ enforceActions: 'observed' });

class Store {
  mainStore: MainStore;

  constructor() {
    this.mainStore = new MainStore();
  }
}

export default new Store();