import React, { useEffect, useState } from "react";
import "./Cronograma.css";
import { usePerson } from "../../hooks/personHook";
import { createScheduleService } from "../../api/service/ScheduleService";

const diasMap = {
  1: "segunda",
  2: "terca",
  3: "quarta",
  4: "quinta",
  5: "sexta",
};

const Cronograma = () => {
  const { person } = usePerson();
  const scheduleService = createScheduleService();

  const [dados, setDados] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        if (!person) return;

        let items = [];

        if (person.teacherId) {
          items = await scheduleService.getByTeacher(person.teacherId);
        }

        else if (person.studentId) {
          const schedule = await scheduleService.getByStudent(person.studentId);
          items = schedule?.items || [];
        }

        const tabela = [];

        items.forEach((item) => {
          const hora = parseInt(item.startTime.split(":")[0]);
          const index = hora - 7; 

          if (!tabela[index]) {
            tabela[index] = {};
          }

          tabela[index][diasMap[item.dayOfWeek]] =
            item.subjectName || item.subject?.name || "—";
        });

        setDados(tabela);
      } catch (error) {
        console.error("Erro ao carregar cronograma:", error);
      }
    };

    load();
  }, [person]);

  return (
    <table className="tabela-rosa">
      <thead>
        <tr>
          <th>Segunda-feira</th>
          <th>Terça-feira</th>
          <th>Quarta-feira</th>
          <th>Quinta-feira</th>
          <th>Sexta-feira</th>
        </tr>
      </thead>

      <tbody>
        {dados.length === 0 ? (
          <tr>
            <td colSpan="5">Nenhum cronograma encontrado</td>
          </tr>
        ) : (
          dados.map((linha, index) => (
            <tr key={index}>
              <td>{linha?.segunda || "-"}</td>
              <td>{linha?.terca || "-"}</td>
              <td>{linha?.quarta || "-"}</td>
              <td>{linha?.quinta || "-"}</td>
              <td>{linha?.sexta || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Cronograma;