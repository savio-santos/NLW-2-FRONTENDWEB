import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const [scheduleItens, setScheduleItens] =
        useState([
            { week_day: 0, from: '', to: '' },
        ]);

    function addNewScheduleItem() {
        setScheduleItens([
            ...scheduleItens,
            { week_day: 0, from: '', to: '' }
        ]);


        scheduleItens.push(
            { week_day: 0, from: '', to: '', }

        );
    }

    function setScheduleItemValue(position: number, field: string, value: string)//faz a alteraçao no select de dias pelos numeros correspondentes como no banco
    {
        const updateScheduleItens = scheduleItens.map((scheduleitem, index) => {
            if (index === position) {
                return { ...scheduleitem, [field]: value };
            }
            return scheduleitem;
        });
        setScheduleItens(updateScheduleItens);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('/classes',{
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost:Number(cost),
            schedule:scheduleItens
        }).then(()=>{
            alert('CAdastro realizado com sucesso');
            history.push('/give-classes');

        }).catch(()=>{
            alert('erro no cadastro')
        })
        
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrivel que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição"
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input name="name" label="Nome completo" value={name}
                            onChange={e => { setName(e.target.value) }} />

                        <Input name="avatar" label="avatar" value={avatar}
                            onChange={e => { setAvatar(e.target.value) }} />

                        <Input name="whatsapp" label="whatsapp" value={whatsapp}
                            onChange={e => { setWhatsapp(e.target.value) }}
                        />

                        <TextArea name="bio" label="Biografia" value={bio}
                            onChange={e => { setBio(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subjet"
                            label="Matéria"
                            value={subject}
                            onChange={e => { setSubject(e.target.value) }}
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
                        <Input name="cost" label="Custo da sua hora/aula"
                            value={cost}
                            onChange={e => { setCost(e.target.value) }}

                        />
                    </fieldset>
                    <fieldset>
                        <legend>Horarios dispponiveis
                            <button type="button" onClick={addNewScheduleItem}>+Novo Horario</button>
                        </legend>
                        {scheduleItens.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select

                                        name="week_day"
                                        label="Dia da semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}

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
                                    <Input name="from" label="Das" type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                    />
                                    <Input name="to" label="Até" type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                    />
                                </div>


                            );
                        })}
                    </fieldset>



                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>

        </div>
    )
}
export default TeacherForm;