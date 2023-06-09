import { createReducer, on } from "@ngrx/store";
import { EmployeeState } from "./EmployeeState.interface";
import { addEmployeeAction, addEmployeeFailureAction, addEmployeeSuccessAction, deleteEmployeeAction, deleteEmployeeFailureAction, deleteEmployeeSuccessAction, getEmployeesAction, getEmployeesFailureAction, getEmployeesSuccessAction, searchEmployeesAction, updateEmployeeAction, updateEmployeeFailureAction, updateEmployeeSuccessAction } from "./actions";
import { Employee } from "src/app/employee";

let employeeAllData: Employee[] = [];

const initialState: EmployeeState = {
    employees: [],
    error: null,
    isLoading: false
}

export const employeeReducer = createReducer(
    initialState,
    on(getEmployeesAction, (state): EmployeeState => ({
        ...state,
        isLoading: true
    })),
    on(getEmployeesSuccessAction, (state, action): EmployeeState => {
        employeeAllData = action.employees;

        return ({
            ...state,
            isLoading: false,
            employees: action.employees
        })
    }),
    on(getEmployeesFailureAction, (state, action): EmployeeState => ({
        ...state,
        isLoading: false,
        error: action.error
    })),
    on(addEmployeeAction, (state): EmployeeState => ({
        ...state,
        isLoading: true
    })),
    on(addEmployeeSuccessAction, (state, action): EmployeeState => ({
        ...state,
        isLoading: false,
        employees: [...state.employees, action.employee]
    })),
    on(addEmployeeFailureAction, (state, action): EmployeeState => ({
        ...state,
        isLoading: false,
        error: action.error
    })),
    on(updateEmployeeAction, (state): EmployeeState => ({
        ...state,
        isLoading: true
    })),
    on(updateEmployeeSuccessAction, (state): EmployeeState => ({
        ...state,
        isLoading: false
    })),
    on(updateEmployeeFailureAction, (state, action): EmployeeState => ({
        ...state,
        isLoading: false,
        error: action.error
    })),
    on(deleteEmployeeAction, (state): EmployeeState => ({
        ...state,
        isLoading: true
    })),
    on(deleteEmployeeSuccessAction, (state, action): EmployeeState => ({
        ...state,
        isLoading: false,
        employees: state.employees.filter(employee => employee.id !== action.employeeId)
    })),
    on(deleteEmployeeFailureAction, (state, action): EmployeeState => ({
        ...state,
        isLoading: false,
        error: action.error
    })),
    on(searchEmployeesAction, (state, action): EmployeeState => ({
        ...state,
        isLoading: false,
        employees: employeeAllData.filter(initialEmployee => initialEmployee.name != null && initialEmployee.name.toLowerCase().includes(action.search.toLowerCase()))
    }))
)

export function reducer(state: EmployeeState | undefined, action: any) {
    return employeeReducer(state, action);
}