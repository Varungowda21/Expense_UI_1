import axios from "axios"
import Swal from 'sweetalert2'
export default function ExpenseTable(props){
  const {expenses,getCategoryName}=props
  const deleteExpense=(expense)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        })
      axios.delete(`http://localhost:3111/api/expenses/${expense}`)
      .then(response=>{
        const result=response.data
        console.log(result)
        props.handleRemoveExpense(result)
        })
      .catch(err=>{
        console.log(err)
      })
    }
  })
}
  
 return(
  <div>
  <h2 style={{color: "chocolate"}}>Listing expenses - {expenses.length}</h2>
  {expenses.length>0?(
    <div>
      <table border='1' className="table">
        <thead>
          <tr>
            <th scope="col">Sl no</th>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Title</th>
            <th scope="col">Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((ele,i)=>{
              return(
                <tr key={ele._id}>
                  <td>{i+1}</td>
                  <td>{ele.expenseDate}</td>
                  <td>{ele.amount}</td>
                  <td>{ele.title}</td>
                  <td>{getCategoryName(ele)}</td>
                  <td><button className="btn btn-danger" onClick={()=>deleteExpense(ele._id)}>delete</button></td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <h3>Total expenses-{expenses.reduce((acc,cv)=>{
        return acc+cv.amount},0)}
    </h3>
    </div>)
    :<p>No expenses</p>}
</div>
 )
}