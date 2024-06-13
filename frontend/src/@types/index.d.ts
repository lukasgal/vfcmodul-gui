import { VFCType } from "../store";

export interface TabProps {
  title: string;
  id: string;
}

export interface MainTabsProps extends TabProps{
  component: JSX.Element;
}

interface VFCObjectTabsProps extends TabProps{
  type: VFCType;
}

interface VFCObject {
  active: boolean;
  descLong: string;
  module: string;
  parentVfcId: string;
  path: string;
  selectable: boolean;
  vfcId: string;
  vfcType: VFCType | string;
  visualVfcId: string;
}

type PostMessageCancel = {
  type: string = 'cancel';
};

interface PostMessageSubmit {
  type: string = 'code';
  vfcObjects: VFCObject[];
}

interface VFCDataContextType {
  [key: string]: VFCObject[];
}

type SelectedResults = {
  FA: VFCObject;
  FO_K: VFCObject;
  FO_F: VFCObject;
  FL_F: VFCObject;
  FL_O: VFCObject;
  FB: VFCObject[] | undefined;
};

interface VFCResultsContextType {
  selectedData: SelectedResults;
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedResults>>;
}

type SelectCallback = (item: VFCObject | null) => void;