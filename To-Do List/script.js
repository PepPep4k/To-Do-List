// ฟังก์ชันสำหรับเพิ่มงานใหม่
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        Swal.fire("⚠️ กรุณาเขียนสิ่งที่ต้องทำ!");
        return;
    }

    const list = document.getElementById('task-list');

    // สร้าง Element ใหม่
    const li = document.createElement('li');
    li.className = "flex items-center bg-gray-50 p-2 rounded-md justify-between";

    // Checkbox สำหรับติ๊กถูก
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.className = "mr-3";
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            span.classList.add("line-through", "text-gray-500");
        } else {
            span.classList.remove("line-through", "text-gray-500");
        }
    });

    // ข้อความ
    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = "flex-grow";

    // ส่วนของปุ่ม
    const buttonContainer = document.createElement('div');
    buttonContainer.className = "flex items-center gap-2";

    // ปุ่ม Edit
    const editButton = document.createElement('button');
    editButton.textContent = "✏️";
    editButton.className = "text-blue-500 hover:text-blue-700";
    editButton.onclick = () => editTask(span);

    // ปุ่ม Delete
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "❌";
    deleteButton.className = "text-red-500 hover:text-red-700";
    deleteButton.onclick = () => list.removeChild(li);

    // ใส่ปุ่มไว้ใน Container
    buttonContainer.appendChild(editButton);
    buttonContainer.appendChild(deleteButton);

    // ประกอบ Element
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(buttonContainer);
    list.appendChild(li);

    // เคลียร์ช่อง Input
    taskInput.value = "";
}

// ฟังก์ชันสำหรับแก้ไขชื่อหัวข้อ
const listTitle = document.getElementById('list-title');
listTitle.addEventListener('click', () => {
    Swal.fire({
        title: 'แก้ไขชื่อหัวข้อ',
        input: 'text',
        inputValue: listTitle.textContent.replace(" ✏️", ""),
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== "") {
            listTitle.textContent = result.value + " ✏️";
            Swal.fire('บันทึกสำเร็จ!', '', 'success');
        } else if (result.isConfirmed && result.value.trim() === "") {
            Swal.fire('⚠️ ข้อมูลไม่ควรเป็นค่าว่าง!', '', 'error');
        }
    });
});

// ฟังก์ชันสำหรับแก้ไขงาน
function editTask(taskElement) {
    Swal.fire({
        title: 'แก้ไขสิ่งที่ต้องทำ',
        input: 'text',
        inputValue: taskElement.textContent,
        showCancelButton: true,
        confirmButtonText: 'บันทึก',
        cancelButtonText: 'ยกเลิก',
    }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== "") {
            taskElement.textContent = result.value;
            Swal.fire('บันทึกสำเร็จ!', '', 'success');
        } else if (result.isConfirmed && result.value.trim() === "") {
            Swal.fire('⚠️ ข้อมูลไม่ควรเป็นค่าว่าง!', '', 'error');
        }
    });
}

// ✅ ฟังก์ชันสำหรับสร้างปฏิทินแสดงวันที่ในสัปดาห์
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ""; // ล้างข้อมูลเก่า

    const today = new Date();
    const currentDay = today.getDay(); // วันในสัปดาห์ (0 = อาทิตย์, 6 = เสาร์)
    
    // หาวันที่ของวันอาทิตย์ของสัปดาห์นี้
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    // Loop เพื่อสร้างกล่องวันที่ 7 ช่อง
    for (let i = 0; i < 7; i++) {
        const dateBox = new Date(startOfWeek);
        dateBox.setDate(startOfWeek.getDate() + i);

        // สร้าง Element
        const dayElement = document.createElement('div');
        dayElement.className = "bg-pink-200 p-3 rounded-md text-center cursor-pointer";

        // แสดงวันที่
        const dayNames = ["Sun", "Mon", "Tue" , "Wed" , "Thu" , "Fri" , "Sun" ];
        dayElement.textContent = dayNames[dateBox.getDay()]

        // ไฮไลต์วันที่ปัจจุบัน
        if (i === currentDay) {
            dayElement.classList.add("bg-blue-200", "font-bold");
            dayElement.classList.remove("bg-pink-200")
        }
        
        calendar.appendChild(dayElement);
    }
}

// ✅ เรียกใช้ฟังก์ชันเมื่อ DOM โหลดเสร็จ
document.addEventListener("DOMContentLoaded", function () {
    renderCalendar();
});
