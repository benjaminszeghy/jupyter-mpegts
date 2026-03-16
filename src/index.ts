import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupyter-mpegts extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-mpegts:plugin',
  description: 'A JupyterLab extension to add a widget that plays mpeg-ts streams',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyter-mpegts is activated!');
  }
};

export default plugin;
