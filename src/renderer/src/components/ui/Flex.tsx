import React from "react";

interface BaseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    React.DOMAttributes<HTMLDivElement> {
  children?: any;
}

interface Props extends BaseProps {
  col: boolean;
  round: boolean;
  inline: boolean;
  fullWidth: boolean;
  fullHeight: boolean;
  width: React.CSSProperties["width"];
  height: React.CSSProperties["height"];
  border: React.CSSProperties["border"];
  borderR: React.CSSProperties["borderRadius"];
  align: React.CSSProperties["alignItems"];
  justify: React.CSSProperties["justifyContent"];
  gap: React.CSSProperties["gap"];
  m: React.CSSProperties["margin"];
  mT: React.CSSProperties["marginTop"];
  mB: React.CSSProperties["marginBottom"];
  mL: React.CSSProperties["marginLeft"];
  mR: React.CSSProperties["marginRight"];
  mX: React.CSSProperties["marginInline"];
  mY: React.CSSProperties["marginInline"];
  p: React.CSSProperties["padding"];
  pT: React.CSSProperties["paddingTop"];
  pB: React.CSSProperties["paddingBottom"];
  pL: React.CSSProperties["paddingLeft"];
  pR: React.CSSProperties["paddingRight"];
  pX: React.CSSProperties["paddingInline"];
  pY: React.CSSProperties["paddingInline"];
  cursor: React.CSSProperties["cursor"];
  background: React.CSSProperties["background"];
  minHeight: React.CSSProperties["minHeight"];
  minWidth: React.CSSProperties["minWidth"];
  maxWidth: React.CSSProperties["maxWidth"];
  maxHeight: React.CSSProperties["maxHeight"];
  overflow: React.CSSProperties["overflow"];
  zIndex: React.CSSProperties["zIndex"];
  fontSize: React.CSSProperties["fontSize"];
  fontWeight: React.CSSProperties["fontWeight"];
  opacity: React.CSSProperties["opacity"];
  transition: React.CSSProperties["transition"];

  title: React.HTMLAttributes<HTMLDivElement>["title"];
  onClick: React.DOMAttributes<HTMLDivElement>["onClick"];
}

export const StyleMap: Partial<Record<keyof Props, keyof React.CSSProperties>> =
  {
    width: "width",
    height: "height",
    border: "border",
    borderR: "borderRadius",
    align: "alignItems",
    justify: "justifyContent",
    gap: "gap",
    m: "margin",
    mT: "marginTop",
    mB: "marginBottom",
    mL: "marginLeft",
    mR: "marginRight",
    mX: "marginInline",
    mY: "marginInline",
    p: "padding",
    pT: "paddingTop",
    pB: "paddingBottom",
    pL: "paddingLeft",
    pR: "paddingRight",
    pX: "paddingInline",
    pY: "paddingInline",
    cursor: "cursor",
    background: "background",
    minHeight: "minHeight",
    minWidth: "minWidth",
    maxWidth: "maxWidth",
    maxHeight: "maxHeight",
    overflow: "overflow",
    zIndex: "zIndex",
    fontSize: "fontSize",
    fontWeight: "fontWeight",
    opacity: "opacity",
    transition: "transition",
  };

const Flex: React.FC<Partial<Props>> = (props) => {
  const style: React.CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    ...props.style,
  };

  Object.keys(props).forEach((p) => {
    const key = p as keyof Props;
    if (StyleMap[key]) {
      style[StyleMap[key]] = props[key];
    }
  });
  if (props.col) {
    style.flexDirection = "column";
  }
  if (props.inline) {
    style.display = "inline-flex";
  }
  if (props.fullWidth) {
    style.width = "100%";
  }
  if (props.fullHeight) {
    style.height = "100%";
  }
  if (props.round) {
    style.borderRadius = "50%";
  }
  return (
    <div
      id={props.id}
      title={props.title}
      style={style}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Flex;
