import { useEffect, useState } from "react"


function App() {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses")
    return saved ? JSON.parse(saved) : []
  })

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  function addExpense() {

    if (!title || !amount) return

    let newExpense = {
      id: Date.now(),
      title: title,
      amount: parseFloat(amount),
    };

    setExpenses([...expenses, newExpense]);

    setTitle("");
    setAmount("");
  }

  function deleteExpense(id) {

    setExpenses(expenses.filter((e) => e.id !== id))
  }

  return (
    <div className="bg-gray-950 min-h-screen text-white flex flex-col items-center pt-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Expense Tracker</h1>

      <div className="w-full max-w-xl flex flex-col gap-4">

        <div className="flex gap-2">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Expense title"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-green-500 flex-1"
          />
          <input
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            placeholder="Amount"
            className="bg-gray-800 text-white px-4 py-2 rounded-lg outline-none w-28 focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={addExpense}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-semibold transition"
          >
            Add
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {expenses.map((e) => (
            <div key={e.id} className="bg-gray-800 px-4 py-3 rounded-lg flex justify-between items-center">
              <span>{e.title}</span>
              <div className="flex items-center gap-4">
                <span className="text-green-400 font-semibold">₹{e.amount}</span>
                <button
                  onClick={() => deleteExpense(e.id)}
                  className="text-red-400 hover:text-red-300 text-sm transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-800 px-4 py-3 rounded-lg flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="text-green-400 font-bold">₹{total}</span>
        </div>

      </div>
    </div>
  )
}

export default App
