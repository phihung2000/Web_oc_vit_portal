import { makeAutoObservable } from "mobx";
class ModalChooseDisplay {
    isOpen = false;
    isOpenImage = false;
    data = {};
    dataImage = {};
    constructor() {
        makeAutoObservable(this);
    }
    setIsOpen(value: boolean) {
        this.isOpen = value;
    }
    setData(value: any) {
        if (value){
            this.data = value;
        }
    }
    setIsOpenImage(value: boolean) {
        this.isOpenImage = value;
    }
    setDataImage(value: any) {
        if (value){
            this.dataImage = value;
        }
    }
}
const storeModal = new ModalChooseDisplay();
export default storeModal;