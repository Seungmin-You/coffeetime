import React, { useState, useEffect, useRef } from 'react';

function App() {
    const [ticketNumber, setTicketNumber] = useState('');
    const [currentNumber, setCurrentNumber] = useState(0);
    const [alertVisible, setAlertVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    // isNumber 함수 정의
    const isNumber = (value) => {
        return !isNaN(value) && value.trim() !== '';
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNumber(prev => {
                const newNumber = prev + 1;
                if (isNumber(ticketNumber) && ticketNumber.length > 1 && newNumber === parseInt(ticketNumber)) {
                    setAlertVisible(true);
                }
                return newNumber;
            });
        }, 5000);

        return () => clearInterval(interval);
    }, [ticketNumber]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isNumber(inputValue) || inputValue.length < 2) {
            alert("유효한 대기표 번호를 입력하세요.");
            return;
        }
        setTicketNumber(inputValue);
        setInputValue('');
        inputRef.current.focus();
    };

    const handleCloseAlert = () => {
        setAlertVisible(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>커피 대기 알림</h1>
            <p>현재 번호: {currentNumber}</p>
            <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                ref={inputRef}
                placeholder="대기표 번호 입력"
            />
            <button type="submit">제출</button>
            {alertVisible && (
                <div>
                    <p>알림: 당신의 커피가 준비되었습니다!</p>
                    <button onClick={handleCloseAlert}>닫기</button>
                </div>
            )}
        </form>
    );
}

export default App;
