const calculateGPAX = () => {
    const gradeToPoint = (grade) => {
        switch (grade) {
            case 'A': return 4; case 'B+': return 3.5;
            case 'B': return 3; case 'C+': return 2.5;
            case 'C': return 2; case 'D+': return 1.5;
            case 'D': return 1; default: return 0;
        }
    };

    const getTableRowData = (row) => {
        const code = row.cells[2].innerHTML;
        const unit = parseInt(row.cells[3].innerHTML);
        const point = gradeToPoint(row.cells[4].innerHTML.trim());
        return { code, unit, point };
    };

    const tbody = document.querySelector('tbody');
    const list = [];

    for (const row of tbody.rows) {
        const data = getTableRowData(row);

        const index = list.findIndex(item => item.code === data.code);
        if (index > -1) {
            const oldData = list[index];
            list[index] = oldData.point > data.point ? oldData : data;
        } else {
            list.push(data);
        }
    }

    const point = list.map(item => item.unit * item.point).reduce((prev, cur) => prev + cur);
    const unit = list.map(item => item.unit).reduce((prev, cur) => prev + cur);
    const gpax = parseFloat(point / unit).toFixed(2);

    return { unit, gpax };
};

const showGPAX = () => {
    const { unit, gpax } = calculateGPAX();
    const show = document.getElementById('yw0');

    show.innerHTML = `
        หน่วยกิตรวม: <strong>${unit}</strong><br />
        เกรดเฉลี่ย: <strong>${gpax}</strong>
    `;

    show.classList.add('alert', 'alert-success');
    show.setAttribute('style', 'margin-top: 15px');
};

document.addEventListener('DOMContentLoaded', showGPAX);