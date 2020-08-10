import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import './styles.css';
import TeacherItem,{Teacher} from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        setTeachers(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponiveis.">
                <form id="search-teachers" onSubmit={searchTeachers}>
                    <Select
                        name="subjet"
                        label="Matéria"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biológia', label: 'Biologia' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Inglês', label: 'Inglês' },
                            { value: 'Quimíca', label: 'Quimíca' },

                        ]}
                    />
                    <Select
                        name="week_day"
                        label="Dia da semana"
                        value={week_day}
                        onChange={e => setWeekDay(e.target.value)}
                        options={[
                            { value: '0', label: 'domingo' },
                            { value: '1', label: 'segunda-feira' },
                            { value: '2', label: 'terça-feira' },
                            { value: '3', label: 'quarta-feira' },
                            { value: '4', label: 'quinta-feira' },
                            { value: '5', label: 'sexta-feira' },
                            { value: '6', label: 'sábado' },

                        ]}
                    />


                    <Input name="time" type="time" label="Hora"
                        value={time}
                        onChange={e => setTime(e.target.value)}
                    />
                    <button type="submit" className="seach-button">Buscar</button>
                </form>
            </PageHeader>
            <main>
                {
                    teachers.map((teacher: Teacher) => {
                        return <TeacherItem key={teacher.id} teacher={teacher} />
                    })
                }


            </main>

        </div>
    );
}
export default TeacherList;