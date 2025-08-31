import { defineStore } from 'pinia'
import { type Ref } from "vue";

interface WorkPeriod {
  start: Date;
  end: Date;
}

export const useCvStore = defineStore('CV', () => {
  const cvData: Ref<CV | null> = ref(null);

  function setData(data: CV): void {
    cvData.value = data;
  }

  function clearStore(): void {
    cvData.value = null;
  }

  const workExperienceYears = computed((): number => {
    if (!cvData.value?.career_stages) {
      return 0;
    }

    // Filter stages that should be counted and have valid dates
    const validStages: WorkPeriod[] = cvData.value.career_stages
      .filter(stage => stage.use_in_accumulate_work_experience && stage.from)
      .map(stage => ({
        start: new Date(stage.from!), // Non-null assertion since we filtered for stage.from
        end: stage.to ? new Date(stage.to) : new Date()
      }))
      .sort((a, b) => a.start.getTime() - b.start.getTime());

    if (validStages.length === 0) return 0;

    // Merge overlapping periods
    const mergedPeriods: WorkPeriod[] = [];
    let currentPeriod: WorkPeriod = validStages[0]!;

    for (let i = 1; i < validStages.length; i++) {
      const nextStage = validStages[i];

      if (nextStage && nextStage.start <= currentPeriod.end) {
        currentPeriod.end = new Date(Math.max(currentPeriod.end.getTime(), nextStage.end.getTime()));
      } else if (nextStage) {
        // No overlap, save current period and start new one
        mergedPeriods.push(currentPeriod);
        currentPeriod = nextStage;
      }
    }
    mergedPeriods.push(currentPeriod); // Add the last period

    // Calculate total months from merged periods
    let totalMonths = 0;
    for (const period of mergedPeriods) {
      const yearDiff = period.end.getFullYear() - period.start.getFullYear();
      const monthDiff = period.end.getMonth() - period.start.getMonth();
      const dayDiff = period.end.getDate() - period.start.getDate();

      let months = yearDiff * 12 + monthDiff;
      if (dayDiff < 0) {
        months -= 1;
      }

      totalMonths += Math.max(0, months);
    }

    return Math.floor(totalMonths / 12);
  });

  return {
    setData,
    clearStore,
    cvData,
    workExperienceYears
  } as const;
});