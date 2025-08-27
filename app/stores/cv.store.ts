import { defineStore } from 'pinia'
import { type Ref } from "vue";

export const useCvStore_new = defineStore('CV', () => {
  const cvData: Ref<CV | null> = ref(null);

  function setData(data: CV) {
    cvData.value = data;
  }

  function clearStore() {
    cvData.value = null;
  }

  const workExperienceYears = computed(() => {
    // Prüfe ob globales Flag aktiv ist
    if (!cvData.value?.accumulate_work_experience || !cvData.value?.career_stages) return 0

    // Nur Stages die explizit für die Berechnung markiert sind
    const relevantStages = cvData.value.career_stages.filter(
      (stage: CareerStage) => stage.use_in_accumulate_work_experience && stage.from
    )

    if (relevantStages.length === 0) return 0

    // Erstelle Zeitintervalle und sortiere sie nach Startdatum
    interface TimeInterval {
      start: Date
      end: Date
    }

    const intervals: TimeInterval[] = relevantStages.map((stage: CareerStage) => ({
      start: new Date(stage.from!),
      // Wenn "to" null ist, dann bis heute berechnen
      end: stage.to ? new Date(stage.to) : new Date()
    })).sort((a: TimeInterval, b: TimeInterval) => a.start.getTime() - b.start.getTime())

    if (intervals.length === 0) return 0

    // Merge überlappende Intervalle um Doppelzählung zu vermeiden
    const mergedIntervals: TimeInterval[] = []
    let current: TimeInterval = intervals[0]!

    for (let i = 1; i < intervals.length; i++) {
      const next: TimeInterval = intervals[i]!
      
      // Wenn das nächste Intervall mit dem aktuellen überlappt oder direkt anschließt
      if (next.start <= current.end) {
        // Erweitere das aktuelle Intervall bis zum späteren Enddatum
        current.end = new Date(Math.max(current.end.getTime(), next.end.getTime()))
      } else {
        // Kein Overlap - füge das aktuelle Intervall hinzu und starte ein neues
        mergedIntervals.push(current)
        current = next
      }
    }
    mergedIntervals.push(current)

    // Berechne die Gesamtzeit ohne Überschneidungen
    let totalMonths = 0
    mergedIntervals.forEach((interval: TimeInterval) => {
      const monthsDiff = 
        (interval.end.getFullYear() - interval.start.getFullYear()) * 12 + 
        (interval.end.getMonth() - interval.start.getMonth())
      
      totalMonths += Math.max(0, monthsDiff) // Verhindere negative Werte
    })

    return Math.floor(totalMonths / 12)
  })

  return {
    setData,
    clearStore,
    cvData,
    workExperienceYears
  };
});

