from ipywidgets import DOMWidget
from traitlets import Unicode

MODULE_NAME = "jupyter-mpegts"
MODULE_VERSION = "^0.1.0"


class mpegts_widget(DOMWidget):
    """
    A Jupyter widget for playing MPEG-TS streams.
    """

    # Widget model and view configuration
    _model_name = Unicode("mpegts_widget").tag(sync=True)
    _model_module = Unicode(MODULE_NAME).tag(sync=True)
    _model_module_version = Unicode(MODULE_VERSION).tag(sync=True)
    _view_name = Unicode("mpegts_widget_view").tag(sync=True)
    _view_module = Unicode(MODULE_NAME).tag(sync=True)
    _view_module_version = Unicode(MODULE_VERSION).tag(sync=True)

    # Traits for widget state
    source = Unicode("").tag(sync=True)
    output = Unicode("").tag(sync=True)

    def display_mpegts(self, source: str) -> "mpegts_widget":
        """
        Display an MPEG-TS stream in the widget.
        """
        self.source = source
        self.output = source
        return self

