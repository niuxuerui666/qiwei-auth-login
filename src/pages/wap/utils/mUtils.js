export const setContentHeight = (that, ele, height) => {
  that.$nextTick(() => {
    ele.style.height = document.body.clientHeight - height + "px";
  });
};
