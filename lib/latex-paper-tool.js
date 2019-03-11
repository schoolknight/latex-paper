'use babel';

import LatexPaperToolView from './latex-paper-tool-view';
import { CompositeDisposable } from 'atom';

export default {

  latexPaperToolView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.latexPaperToolView = new LatexPaperToolView(state.latexPaperToolViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.latexPaperToolView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'latex-paper-tool:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.latexPaperToolView.destroy();
  },

  serialize() {
    return {
      latexPaperToolViewState: this.latexPaperToolView.serialize()
    };
  },

  toggle() {
    console.log('LatexPaperTool was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
