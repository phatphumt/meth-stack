declare namespace JSX {
  interface HtmlTag {
    _?: string;
    ["hx-emit"]?: string;
    ["x-data"]?: string;
    ["x-init"]?: string;
    ["x-show"]?: string;
    ["x-text"]?: string;
    ["x-html"]?: string;
    ["x-model"]?: string;
    ["x-modelable"]?: string;
    ["x-for"]?: string;
    ["x-effect"]?: string;
    ["x-ignore"]?: boolean;
    ["x-ref"]?: boolean;
    ["x-cloak"]?: boolean;
    ["x-teleport"]?: string;
    ["x-if"]?: string;
    ["x-on"]?: string;
    ["x-bind"]?: string;
  }
}
