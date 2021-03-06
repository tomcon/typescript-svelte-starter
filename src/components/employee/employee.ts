import AppService from '../../services/appService';

const path = 'employee';

export const fielddata: IField[] = [
{
    label: 'ID', 
    field: 'id',
    component: 'text',
    readOnly: true,
    row: 0,
    col: 'md-6'
}, {
    label: 'Name',
    field: 'name',
    component: 'text',
    required: true,
    row: 1,
    col: 'md-6'
}, {
    label: 'Title',
    field: 'title',
    component: 'text',
    required: true,
    row: 2,
    col: 'md-6'
}, {
    label: 'Department',
    field: 'departmentId',
    component: 'select',
    row: 3,
    col: 'md-6'
}, {
    label: 'Rate',
    field: 'rate',
    component: 'text',
    required: true,
    row: 4,
    col: 'md-6'
}];

export const columndata: IColumn[] = fielddata.map(x => Object.assign({}, x));
export const actionColumn = {
    label: 'Edit', 
    field: 'field',
    component: 'action',
    className: 'secondary',
};
columndata.push(actionColumn);

const initialData = {
    list: [],
    showModal: false,
    selectedItem: null,
    path,              
    fielddata,
    columndata,
};

const departmentField = fielddata.find(x => x.field == 'departmentId');

const employee = {
    oncreate (p) {
        Object.assign(this, p);      
    },

    getList(this: IAppPage) {
        AppService.getList('department').then((depts: any[]) =>{
            this.set({ departmentList: depts });
            departmentField.optionList = depts;
            AppService.getList(path).then(data => {
                this.set({ list: data });
            });
        });
    },

}
export { initialData, employee }