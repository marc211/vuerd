import ERD from './erd/ERD.vue';
import {Command} from 'vuerd-core';

export default {
  install(command: Command) {
    command.editorAdd({
      component: ERD,
      scope: [
        'vuerd',
      ],
    });
  },
};