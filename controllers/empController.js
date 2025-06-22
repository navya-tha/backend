const path = require('path')
const data ={
    employees:require("../models/employees.json"),
    setEmployee:function(data) {this.employees=data}
};
//for creating  a new employee
const createEmployee=(req,res)=>{
  const newEmployee={
    _id:data.employees[data.employees.length-1]._id+1 || 1,
    firstname:req.body.firstname,
    lastname:req.body.lastname
  }
  if(!newEmployee.firstname || !newEmployee.lastname)
    return res.status(400).json({"message":"First name and last name are required"})
  data.setEmployee([...data.employees,newEmployee])
  res.status(201).json(data.employees)
};

////for updating the employee
const updateEmployee=(req,res)=>{
    const employee=data.employees.find(emp=>emp._id===parseInt(req.body.id))
    if(!employee)
        return res.status(400).json({"message":`Employee id ${req.body} not found`})
    if(req.body.firstname) employee.firstname=req.body.firstname
    if(req.body.lastname) employee.lastname=req.body.lastname
    const filterArray = data.employees.filter(
        emp=>emp._id!==parseInt(req.body.id)
    )
    const unsortedArray = [...filterArray,employee]
    data.setEmployee(unsortedArray.sort((a,b)=>a._id>b._id?1:-1))
    res.json(data.employees)
};

//for deleting an employee
const deleteEmployee=(req,res)=>{
    const employee=data.employees.find(emp=>emp._id===parseInt(req.body.id))
    if(!employee)
        return res.status(400).json({"message":`Employee id ${req.body} not found`})
    const filterArray = data.employees.filter(
        emp=>emp._id!==parseInt(req.body.id)
    )
    data.setEmployee([...filterArray])
    res.json(data.employees);
};

const getAllEmployees=(req,res)=>{
    res.json(data.employees);
};

const getEmployee=(req,res)=>{
    const employee=data.employees.find(emp=>emp._id===parseInt(req.params.id))
    if(!employee)
        return res.status(400).json({"message":`Employee id ${req.params.id} not found`})
    res.json(employee)
};
module.exports={
    getAllEmployees,
    getEmployee,
    updateEmployee,
    createEmployee,
    deleteEmployee,
}