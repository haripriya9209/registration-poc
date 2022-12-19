import { Table, Column, MenuItem, Button } from 'react-rainbow-components';

const ListItem = ({loading, items, checkIn, setSelectedItem, handlePrint }) =>{
    
    // const deleteItem = async (id) => {
        // const list = JSON.parse(localStorage.list)
        // if(list){
        //     list.map(i => {
        //         if(i['Booking Id'] === id){
        //             list.pop(i)
        //         }
        //     })
        // }
        // localStorage.setItem("list", JSON.stringify(list));
        // window.location.reload();
        
        // window.location.reload();
    // }
    // console.log(items);

    return (
        <div className="dataTable-container">
            <div className="dataTable">
                
                <Table
                    data={items}
                    keyField="id"
                    isLoading={loading}
                >
                    <Column header="Name" field="name"/>
                    <Column header="Email" field="emailId" />
                    <Column header="Number" field="phoneNumber" />
                    <Column header="Booking Id" field="bookingId" />
                    <Column header="Check-in Status" field="checkIn" />
                    <Column type="action">
                        <Button label="Check-in" onClick={(event, data) => checkIn(data)} />
                        {/* <MenuItem label="Delete" onClick={(event, data) => deleteItem(data['id'])} /> */}
                        {/* <MenuItem label="Print" onClick={(event, data) => {setSelectedItem(data);handlePrint()}} /> */}
                    </Column>
                
                </Table>
            </div>
        </div>
    )
}

export default ListItem;