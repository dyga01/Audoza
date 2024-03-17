// Creates the pie chart

document.addEventListener('DOMContentLoaded', function() {
    // 50/30/20 Canvas
    const canvas1 = document.getElementById('myPieChart1');
    const ctx1 = canvas1.getContext('2d');

    // Zero Based Canvas
    const canvas2 = document.getElementById('myPieChart2');
    const ctx2 = canvas2.getContext('2d');

    // Conservative Canvas
    const canvas3 = document.getElementById('myPieChart3');
    const ctx3 = canvas3.getContext('2d');

    // Balanced Canvas
    const canvas4 = document.getElementById('myPieChart4');
    const ctx4 = canvas4.getContext('2d');

    // Aggressive Canvas
    const canvas5 = document.getElementById('myPieChart5');
    const ctx5 = canvas5.getContext('2d');

    // Data for 50/30/20 chart
    const data1 = {
        values1: [50, 30, 20], 
        labels1: ['Needs', 'Wants', 'Savings'],
        colors1: ['#000000', '#b0b0b0', '#4A96B6'] 
    };
    let v1 = [Math.round((result/12)*.5), Math.round((result/12)*.3), Math.round((result/12)*.2)];

    // Data for Zero Based chart
    const data2 = {
        values2: [25, 5, 10, 10, 3.3, 3.3, 3.4, 5, 5, 15, 15], 
        labels2: ['Housing', 'Utilities', 'Food', 'Car', 'Gas', 'Insurance', 'Other Bills', 'Emergency', 'Travel', 'Retirement', 'Investments'],
        colors2: ['#000000', '#b0b0b0', '#4A96B6', '#6ab07c', '#bfa9db', '#5b5d8c', '#f2c172', '#fc9e97', '#f2aede', '#aef2df', '#edebab'] 
    };
    let v2 = [Math.round((result/12)*.25), Math.round((result/12)*.05), Math.round((result/12)*.1), Math.round((result/12)*.1), Math.round((result/12)*.033), Math.round((result/12)*.033), Math.round((result/12)*.034), Math.round((result/12)*.05), Math.round((result/12)*.05), Math.round((result/12)*.15), Math.round((result/12)*.15)];

    // Data for Conservative chart
    const data3 = {
        values3: [30, 10, 10, 5, 10, 5, 5, 10, 10, 5], 
        labels3: ['Housing', 'Utilities', 'Food', 'Gas', 'Insurance', 'Retirement', 'Investments', 'Emergency', 'Other Bills', 'Car'],
        colors3: ['#000000', '#b0b0b0', '#4A96B6', '#6ab07c', '#bfa9db', '#5b5d8c', '#f2c172', '#fc9e97', '#f2aede', '#aef2df'] 
    };
    let v3 = [Math.round((result/12)*.3), Math.round((result/12)*.1), Math.round((result/12)*.1), Math.round((result/12)*.05), Math.round((result/12)*.1), Math.round((result/12)*.05), Math.round((result/12)*.05), Math.round((result/12)*.1), Math.round((result/12)*.1), Math.round((result/12)*.05)];

    // Data for Balanced chart
    const data4 = {
        values4: [25, 12, 10, 8, 8, 8, 7, 7, 5, 10], 
        labels4: ['Housing', 'Utilities', 'Food', 'Gas', 'Insurance', 'Retirement', 'Investments', 'Emergency', 'Other Bills', 'Car'],
        colors4: ['#000000', '#b0b0b0', '#4A96B6', '#6ab07c', '#bfa9db', '#5b5d8c', '#f2c172', '#fc9e97', '#f2aede', '#aef2df'] 
    };
    let v4 = [Math.round((result/12)*.25), Math.round((result/12)*.12), Math.round((result/12)*.1), Math.round((result/12)*.08), Math.round((result/12)*.08), Math.round((result/12)*.08), Math.round((result/12)*.07), Math.round((result/12)*.07), Math.round((result/12)*.05), Math.round((result/12)*.1)];

    // Data for  Aggressive chart
    const data5 = {
        values5: [20, 15, 15, 10, 5, 5, 10, 5, 5, 10], 
        labels5: ['Housing', 'Utilities', 'Food', 'Gas', 'Insurance', 'Retirement', 'Investments', 'Emergency', 'Other Bills', 'Car'],
        colors5: ['#000000', '#b0b0b0', '#4A96B6', '#6ab07c', '#bfa9db', '#5b5d8c', '#f2c172', '#fc9e97', '#f2aede', '#aef2df'] 
    };
    let v5 = [Math.round((result/12)*.2), Math.round((result/12)*.15), Math.round((result/12)*.15), Math.round((result/12)*.1), Math.round((result/12)*.05), Math.round((result/12)*.05), Math.round((result/12)*.1), Math.round((result/12)*.05), Math.round((result/12)*.05), Math.round((result/12)*.1)];

    // Function to draw the pie chart
    function drawPieChart(values, colors, canvas, ctx) {
        const totalValue = values.reduce((acc, val) => acc + val, 0);
        let startAngle = 0;

        for (let i = 0; i < values.length; i++) {
            const sliceAngle = (2 * Math.PI * values[i]) / totalValue;

            // Draw pie segment
            ctx.fillStyle = colors[i];
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2);
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.height / 2, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();

            // Calculate the middle angle of the segment
            const middleAngle = startAngle + sliceAngle / 2;

            // Update the starting angle for the next slice
            startAngle += sliceAngle;
        }
    }

    // Create color key HTML dynamically and position it above the canvas
    function createColorKey(values, labels, colors) {
        let colorKeyHTML = '<div id="colorKey" style="display: grid; justify-content: center; padding: 10px; margin-bottom: 20px;">';
        for (let i = 0; i < labels.length; i++) {
            colorKeyHTML += `
                <div style="display: flex; align-items: center; padding: 10px; margin-right: 20px;">
                <div style="width: 20px; height: 20px; background-color: ${colors[i]}; margin-right: 10px;"></div>
                <span>${labels[i] + ': $' + values[i]}</span>
                </div>
            `;
        }
        colorKeyHTML += '</div>'; 
        return colorKeyHTML;
    }

    // 50/30/20 Budget
    const colorKeyHTML1 = createColorKey(v1, data1.labels1, data1.colors1);
    canvas1.insertAdjacentHTML('beforebegin', colorKeyHTML1);
    drawPieChart(data1.values1, data1.colors1, canvas1, ctx1);

    // Zero Based Budget
    const colorKeyHTML2 = createColorKey(v2, data2.labels2, data2.colors2);
    canvas2.insertAdjacentHTML('beforebegin', colorKeyHTML2);
    drawPieChart(data2.values2, data2.colors2, canvas2, ctx2);

    // Conservative Based Budget
    const colorKeyHTML3 = createColorKey(v3, data3.labels3, data3.colors3);
    canvas3.insertAdjacentHTML('beforebegin', colorKeyHTML3);
    drawPieChart(data3.values3, data3.colors3, canvas3, ctx3);

    // Balanced Budget
    const colorKeyHTML4 = createColorKey(v4, data4.labels4, data4.colors4);
    canvas4.insertAdjacentHTML('beforebegin', colorKeyHTML4);
    drawPieChart(data4.values4, data4.colors4, canvas4, ctx4);

    // Aggresive Budget
    const colorKeyHTML5 = createColorKey(v5, data5.labels5, data5.colors5);
    canvas5.insertAdjacentHTML('beforebegin', colorKeyHTML5);
    drawPieChart(data5.values5, data5.colors5, canvas5, ctx5);
});