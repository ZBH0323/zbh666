document.addEventListener('DOMContentLoaded', () => {
    const studentInput = document.getElementById('studentInput');
    const studentCount = document.getElementById('studentCount');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const nameDisplay = document.getElementById('displayName');
    const historyList = document.getElementById('historyList');
    const importBtn = document.getElementById('importBtn');
    
    let studentNames = [];
    let intervalId = null;
    let isRunning = false;
    let history = [];
    
    // 初始化学生名单
    function initStudentNames() {
        // 添加之前提供的学生姓名
        const previousNames = [
            '陈昊妍', '董萌萌', '范昱涵', '高一涵', '郭超', '白林涵', '侯宪坤', '黄博', '姜子超', '鞠忠宏', '李茂川', '李永乐', '李云', '林佳祺', '吕君蕊', '秦金龙', '秦士淞', '孙家豪', '孙若冰', '孙义凯', '孙子凌', '索京奥', '王朝闻', '王俊豪', '王梦月', '王文昌', '王运旺', '王祉盛', '卫学振', '武启航', '徐浩文', '许广洋', '许源赫', '薛景文', '张丁文', '张静', '张俊飞', '张艳可', '张云翔', '张志恒', '赵宝华', '赵家豪', '周政涟', '邹谦慧'
        ];
        
        studentInput.value = previousNames.join('\n');
        updateStudentNames();
    }
    
    // 更新学生名单
    function updateStudentNames() {
        studentNames = studentInput.value.split('\n').filter(name => name.trim() !== '');
        studentCount.textContent = studentNames.length;
        if (studentNames.length > 0) {
            nameDisplay.textContent = studentNames[0];
        }
        renderHistory();
    }
    
    // 渲染历史记录
    function renderHistory() {
        historyList.innerHTML = '';
        history.slice(0, 10).forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-item-number">#${index + 1}</div>
                <div class="history-item-name">${item}</div>
            `;
            historyItem.addEventListener('click', () => {
                if (!isRunning) {
                    nameDisplay.textContent = item;
                }
            });
            historyList.appendChild(historyItem);
        });
    }
    
    // 添加到历史记录
    function addToHistory(name) {
        if (!history.includes(name)) {
            history.unshift(name);
            renderHistory();
        }
    }
    
    // 开始随机点名
    startBtn.addEventListener('click', () => {
        if (!isRunning && studentNames.length > 0) {
            isRunning = true;
            startBtn.disabled = true;
            stopBtn.disabled = false;
            
            intervalId = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * studentNames.length);
                nameDisplay.textContent = studentNames[randomIndex];
            }, 80);
        }
    });
    
    // 停止随机点名
    stopBtn.addEventListener('click', () => {
        if (isRunning) {
            isRunning = false;
            clearInterval(intervalId);
            startBtn.disabled = false;
            stopBtn.disabled = true;
            
            const selectedName = nameDisplay.textContent;
            addToHistory(selectedName);
        }
    });
    
    // 导入学生名单
    importBtn.addEventListener('click', () => {
        updateStudentNames();
    });
    
    // 监听学生名单输入变化
    studentInput.addEventListener('input', updateStudentNames);
    
    // 初始化
    initStudentNames();
});