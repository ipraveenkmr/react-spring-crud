package com.codingmstr.crud.employee;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String department;
    private Double salary;
}

// Example: Without Lombok:
// public class Employee {
//     private String name;
//     private String designation;

//     // Getters and Setters
//     public String getName() { return name; }
//     public void setName(String name) { this.name = name; }
//     public String getDesignation() { return designation; }
//     public void setDesignation(String designation) { this.designation = designation; }

//     // toString
//     @Override
//     public String toString() {
//         return "Employee{name='" + name + "', designation='" + designation + "'}";
//     }
// }