export enum Subdivision {
    IT = 'IT',
    HR = 'HR',
    Sales = 'Sales',
    Marketing = 'Marketing'
}

export const EmployeePositions = {
    [Subdivision.IT]: ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'DevOps Engineer', 'Software Developer', 'QA Engineer'],
    [Subdivision.HR]: ['HR Manager', 'HR Director'],
    [Subdivision.Sales]: ['Sales Manager', 'Sales Representative', 'Sales Analyst', 'Sales Intern'],
    [Subdivision.Marketing]: ['Marketing Specialist', 'Content Writer', 'Social Media Manager']
}