import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Application, IPlugin } from '@lumino/application';
import { Widget } from '@lumino/widgets';

import { MODULE_NAME, MODULE_VERSION } from './version';
import * as widgetExports from './widget';

const EXTENSION_ID = 'jupyter-mpegts:plugin';

/**
 * Initialization data for the jupyter-mpegts extension.
 */
const plugin: IPlugin<Application<Widget>, void> = {
  id: EXTENSION_ID,
  description:
    'A JupyterLab extension to add a widget that plays mpeg-ts streams',
  requires: [IJupyterWidgetRegistry, INotebookTracker],
  autoStart: true,
  activate: (
    app: Application<Widget>,
    registry: IJupyterWidgetRegistry,
    tracker: INotebookTracker
  ): void => {
    widgetExports.mpegts_widget_view.tracker = tracker;
    registry.registerWidget({
      name: MODULE_NAME,
      version: MODULE_VERSION,
      exports: widgetExports
    });
    console.log('JupyterLab extension jupyter-mpegts is activated!');
  }
};

export default plugin;
