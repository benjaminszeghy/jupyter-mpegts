// Copyright (c) Benny
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers
} from '@jupyter-widgets/base';
import { INotebookTracker } from '@jupyterlab/notebook';
import mpegts from 'mpegts.js';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../style/index.css';

export class mpegts_widget extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      source: '',
      _model_name: mpegts_widget.model_name,
      _model_module: mpegts_widget.model_module,
      _model_module_version: mpegts_widget.model_module_version,
      _view_name: mpegts_widget.view_name,
      _view_module: mpegts_widget.view_module,
      _view_module_version: mpegts_widget.view_module_version
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers
    // Add any extra serializers here
  };

  static model_name = 'mpegts_widget';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'mpegts_widget_view';
  static view_module = MODULE_NAME;
  static view_module_version = MODULE_VERSION;
}

export class mpegts_widget_view extends DOMWidgetView {
  static tracker: INotebookTracker;
  private videoElement: HTMLVideoElement | null = null;
  private player: ReturnType<typeof mpegts.createPlayer> | null = null;

  render() {
    this.el.classList.add('jp-jupyter-mpegts-widget');

    this.videoElement = document.createElement('video');
    this.videoElement.controls = true;
    this.videoElement.autoplay = true;
    this.videoElement.muted = true;
    this.videoElement.playsInline = true;
    this.videoElement.style.width = '100%';
    this.el.appendChild(this.videoElement);

    this.renderSource();

    this.model.on('change:source', this.renderSource, this);
  }

  private renderSource() {
    const source = this.model.get('source') as string;
    if (!this.videoElement || !source) {
      return;
    }

    if (this.player) {
      this.player.destroy();
      this.player = null;
    }

    if (mpegts.isSupported()) {
      const player = mpegts.createPlayer(
        {
          type: 'mpegts',
          url: source,
          isLive: true
        },
        {
          enableWorker: true,
          liveBufferLatencyChasing: true
        }
      );
      player.attachMediaElement(this.videoElement);
      player.load();
      void player.play();
      this.player = player;
      return;
    }

    this.videoElement.src = source;
  }

  remove(): void {
    if (this.player) {
      this.player.destroy();
      this.player = null;
    }
    super.remove();
  }
}
