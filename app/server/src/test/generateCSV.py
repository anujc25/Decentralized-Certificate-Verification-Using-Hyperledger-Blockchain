import csv
import random

department = ["Aerospace Engineering",
                "Biomedical Engineering",
                "Mechanical Engineering",
                "Electrical Engineering",
                "Computer Engineering",
                "General Engineering",
                "Industrial and Systems Engineering"]

degree = ["MSAE",
            "MSBE",
            "MSME",
            "MSEE",
            "MSCMPE",
            "MSSE",
            "MSGE",
            "MSISE",
            "BSCMPE"]

term = ["Spring 2019",
        "Fall 2019",
        "Summer 2018",
        "Fall 2018"
        "Spring 2018",
        "Fall 2017",
        "Summer 2017",
        ]

with open('data.csv', mode='w') as csv_file:
    columnNames = ['studentName', 'issuer', 'selectedFile','term', 'degree', 'department', 'studentEmail' ]
    writer = csv.DictWriter(csv_file, fieldnames=columnNames)

    writer.writeheader()

    student_name_prefix = "test_"
    issuer_name_prefix = "iamanujchaudhari@gmail.com"
    selected_file_prefix = "./resources/sample_pdf.pdf"
    student_email_suffix = "@gmail.com"
    student_email_prefix = "tejaspanchal49"

    for i in range(1,100):
        rowValue = dict()
        rowValue["studentName"] = student_name_prefix + str(i)
        rowValue["issuer"] = issuer_name_prefix
        rowValue["selectedFile"] = selected_file_prefix
        rowValue["term"] = random.choice(term)
        rowValue["degree"] = random.choice(degree)
        rowValue["department"] = random.choice(department)

        if i==1:
            rowValue["studentEmail"] = student_email_prefix + "@gmail.com"
        else:
            rowValue["studentEmail"] = student_email_prefix + "_" + str(i) + "@gmail.com"
        
        writer.writerow(rowValue)