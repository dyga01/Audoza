from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    yearly_salary = None
    if request.method == 'POST':
        yearly_salary = request.form.get('yearly')
        # Convert yearly_salary to an int
        salary = 0
        try:
            salary = int(yearly_salary)
        except ValueError:
            return render_template('index.html')
        return redirect(url_for('budgets', ysal=salary))
    return render_template('index.html')

@app.route('/budgets/<int:ysal>', methods=['GET'])
def budgets(ysal):
    # Render the budgets.html template with the yearly salary
    return render_template('budgets.html', result=ysal)

if __name__ == '__main__':
    app.run(debug=True)