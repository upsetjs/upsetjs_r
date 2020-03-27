declare type HTMLWidget = {
  name: string;
  type: 'output';
  factory(
    el: HTMLElement,
    width: number,
    height: number
  ): {
    renderValue(x: any): void;
    resize(width: number, height: number): void;
  };
};

declare const HTMLWidgets: {
  shinyMode: boolean;
  viewerMode: boolean;
  widget(widget: HTMLWidget): void;
};

declare const Shiny: {
  onInputChange(event: string, msg: any): void;
  addCustomMessageHandler(type: string, callback: (msg: any) => void): void;
};

declare class SelectionHandle {
  setGroup(group: string): void;
  on(
    event: 'change',
    callback: (event: {
      value?: ReadonlyArray<string>;
      oldValue: ReadonlyArray<string>;
      sender: SelectionHandle;
    }) => void
  ): any;
  off(
    event: 'change',
    callback: (event: {
      value?: ReadonlyArray<string>;
      oldValue: ReadonlyArray<string>;
      sender: SelectionHandle;
    }) => void
  ): void;

  readonly value: ReadonlyArray<string>;
  set(selection: ReadonlyArray<string>): void;
  clear(): void;
}

declare class FilterHandle {
  setGroup(group: string): void;
  on(
    event: 'change',
    callback: (event: {
      value?: ReadonlyArray<string>;
      oldValue: ReadonlyArray<string>;
      sender: SelectionHandle;
    }) => void
  ): any;
  off(
    event: 'change',
    callback: (event: {
      value?: ReadonlyArray<string>;
      oldValue: ReadonlyArray<string>;
      sender: SelectionHandle;
    }) => void
  ): void;

  readonly filteredKeys: ReadonlyArray<string>;
  set(filter: ReadonlyArray<string>): void;
  clear(): void;
}

declare const crosstalk: {
  SelectionHandle: typeof SelectionHandle;
  FilterHandle: typeof FilterHandle;
};
