interface Appointment {
    id: string
    date: string
    endDate: string
}

export function parseBrasiliaDate(dateObj: Date, hour = 0, minute = 0) {
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, "0")
    const day = String(dateObj.getDate()).padStart(2, "0")
    const h = hour.toString().padStart(2, "0")
    const m = minute.toString().padStart(2, "0")

    return new Date(`${year}-${month}-${day}T${h}:${m}:00.000-03:00`)
}

export function getNowInBrasilia() {
    const nowBrasilia = new Date().toLocaleString("en-US", {
        timeZone: "America/Sao_Paulo",
    })
    return new Date(nowBrasilia)
}

export function getTodayInBrasilia() {
    const now = getNowInBrasilia();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
}

export function isSlotInPast(slot: string, selectedDate: Date | null) {
  if (!selectedDate) return false

  const [hour, minute] = slot.split(":").map(Number)
  const slotDate = parseBrasiliaDate(selectedDate, hour, minute)
  return slotDate < getNowInBrasilia()
}

export function getAppointmentsCountForSlot(slot: string, appointments: Appointment[], selectedDate: Date | null ) {
    if (!selectedDate) {
        return 0;
    }

    const [hour, minute] = slot.split(":").map(Number)
    const slotStart = parseBrasiliaDate(selectedDate, hour, minute)
    const slotEnd = new Date(slotStart.getTime() + 20 * 60000)

    return appointments.filter(a => {
        const apptStart = new Date(a.date)
        const apptEnd = new Date(a.endDate)

        return slotStart < apptEnd && slotEnd > apptStart
    }).length
}