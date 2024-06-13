import {
  PostMessageCancel,
  PostMessageSubmit,
  SelectedResults,
  VFCObject,
} from "../@types";


export const cancel = () => {
  const parentTarget = window.opener || window.parent;
  parentTarget.postMessage({ type: "cancel" } as PostMessageCancel, "*");
};

export const submit = (data: SelectedResults) => {
  const parentTarget = window.opener || window.parent;
  const message: PostMessageSubmit = {
    type: "code",
    vfcObjects: transformData(data),
  };
  parentTarget.postMessage(message, "*");
};

const transformData: (data: SelectedResults) => VFCObject[] = (
  data: SelectedResults
) => {
  const keys = Object.keys(data) as Array<keyof SelectedResults>;
  const results: VFCObject[] = [];
  keys.forEach((key) => {
    if (Array.isArray(data[key])) {
      (data[key] as Array<VFCObject>).forEach((item: VFCObject) => {
        item.vfcType = key;
        results.push(item);
      });
    } else {
      (data[key] as VFCObject).vfcType = key;
      results.push(data[key] as VFCObject);
    }
  });
  return results;
};
