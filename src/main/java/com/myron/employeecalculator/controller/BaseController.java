package com.myron.employeecalculator.controller;

import com.myron.employeecalculator.data.EmployeeRepository;
import com.myron.employeecalculator.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class BaseController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @RequestMapping(value = "/add/employee", method = RequestMethod.POST)
    public @ResponseBody Employee addEmployee(@RequestBody Map<String, Object> payload) {
        String newId = String.valueOf(payload.get("id"));
        String newFName = String.valueOf(payload.get("firstName"));
        String newLName = String.valueOf(payload.get("lastName"));
        String newPosition = String.valueOf(payload.get("position"));
        String newSalary = String.valueOf(payload.get("salary"));

        Employee newEmployee = new Employee(newId, newFName, newLName, newPosition, newSalary);
        employeeRepository.addEmployee(newEmployee);

        return newEmployee;
    }

    @RequestMapping("/")
    public String baseRoute() {
        return "index";
    }
}