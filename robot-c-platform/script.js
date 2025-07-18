function checkCode() {
  const input = document.getElementById("codeInput");
  const feedback = document.getElementById("feedback");
  const robot = document.getElementById("robot");
  if (input.value.trim() === correctCode) {
    input.className = "correct";
    feedback.textContent = "✅ ถูกต้อง!";
    robot.innerHTML += "<br>🤖 เยี่ยมมาก!";
    localStorage.setItem("score", parseInt(localStorage.getItem("score") || 0) + 10);
    playSound("success");
    submitScore();
  } else if (correctCode.startsWith(input.value)) {
    input.className = "";
    feedback.textContent = "⌨️ กำลังพิมพ์...";
  } else {
    input.className = "wrong";
    feedback.textContent = "❌ ผิดนะ ลองใหม่!";
    playSound("error");
  }
}
function reset() {
  document.getElementById("codeInput").value = "";
  document.getElementById("codeInput").className = "";
  document.getElementById("feedback").textContent = "🕹️ รอคำสั่งของคุณอยู่...";
}
function playSound(type) {
  document.getElementById(type === "success" ? "successSound" : "errorSound").play();
}
function submitScore() {
  fetch("http://localhost:3000/score", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: localStorage.getItem("playerName"),
      score: parseInt(localStorage.getItem("score") || 0)
    })
  });
}