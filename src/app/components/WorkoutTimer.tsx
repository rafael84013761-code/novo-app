"use client"

import { useState, useEffect, useRef } from "react"
import { UserProfile } from "../page"
import { Play, Pause, RotateCcw, Plus, Settings, Volume2, VolumeX, Dumbbell, Save, Check, ChevronRight, Calendar, Edit2, X } from "lucide-react"

type Props = {
  profile: UserProfile
}

type Exercise = {
  name: string
  duration: number
  rest: number
}

type RepExercise = {
  name: string
  sets: number
  reps: number
  weight?: string
}

type WorkoutDay = {
  day: string
  exercises: RepExercise[]
}

const DAYS_OF_WEEK = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

export function WorkoutTimer({ profile }: Props) {
  const [workoutMode, setWorkoutMode] = useState<"timer" | "reps">("timer")
  
  // Timer Mode State
  const [exercises, setExercises] = useState<Exercise[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("workout-exercises")
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error("Erro ao carregar exercícios salvos:", e)
        }
      }
    }
    return [
      { name: "Aquecimento", duration: 300, rest: 60 },
      { name: "Exercício 1", duration: 180, rest: 60 },
      { name: "Exercício 2", duration: 180, rest: 60 },
      { name: "Exercício 3", duration: 180, rest: 60 },
      { name: "Alongamento", duration: 300, rest: 0 },
    ]
  })

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration)
  const [isRunning, setIsRunning] = useState(false)
  const [isResting, setIsResting] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  // Reps Mode State
  const [weeklySchedule, setWeeklySchedule] = useState<WorkoutDay[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("weekly-workout-schedule")
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch (e) {
          console.error("Erro ao carregar agenda:", e)
        }
      }
    }
    return [
      {
        day: "Segunda",
        exercises: [
          { name: "Supino Reto", sets: 3, reps: 10, weight: "60kg" },
          { name: "Supino Inclinado", sets: 3, reps: 10, weight: "50kg" },
          { name: "Crucifixo", sets: 3, reps: 12, weight: "15kg" },
        ]
      },
      {
        day: "Quarta",
        exercises: [
          { name: "Agachamento", sets: 4, reps: 12, weight: "80kg" },
          { name: "Leg Press", sets: 3, reps: 15, weight: "120kg" },
          { name: "Cadeira Extensora", sets: 3, reps: 12, weight: "40kg" },
        ]
      },
      {
        day: "Sexta",
        exercises: [
          { name: "Barra Fixa", sets: 3, reps: 10 },
          { name: "Remada Curvada", sets: 3, reps: 10, weight: "50kg" },
          { name: "Rosca Direta", sets: 3, reps: 12, weight: "15kg" },
        ]
      },
    ]
  })

  const [selectedDay, setSelectedDay] = useState<string>(DAYS_OF_WEEK[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1])
  const [currentRepExerciseIndex, setCurrentRepExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [isRepWorkoutActive, setIsRepWorkoutActive] = useState(false)
  const [showScheduleEditor, setShowScheduleEditor] = useState(false)

  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("workout-exercises", JSON.stringify(exercises))
    }
  }, [exercises])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("weekly-workout-schedule", JSON.stringify(weeklySchedule))
    }
  }, [weeklySchedule])

  const playBeep = (frequency: number, duration: number) => {
    if (!soundEnabled || !audioContextRef.current) return

    const ctx = audioContextRef.current
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = frequency
    oscillator.type = "sine"

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 3 && prev > 0) {
            playBeep(800, 0.1)
          }
          return prev - 1
        })
      }, 1000)
    } else if (timeLeft === 0) {
      playBeep(1000, 0.3)
      
      if (isResting) {
        const nextIndex = currentExerciseIndex + 1
        if (nextIndex < exercises.length) {
          setCurrentExerciseIndex(nextIndex)
          setTimeLeft(exercises[nextIndex].duration)
          setIsResting(false)
          setIsRunning(true)
        } else {
          setIsRunning(false)
          playBeep(1200, 0.5)
        }
      } else {
        const currentRest = exercises[currentExerciseIndex].rest
        if (currentRest > 0) {
          setTimeLeft(currentRest)
          setIsResting(true)
          setIsRunning(true)
        } else {
          const nextIndex = currentExerciseIndex + 1
          if (nextIndex < exercises.length) {
            setCurrentExerciseIndex(nextIndex)
            setTimeLeft(exercises[nextIndex].duration)
            setIsRunning(true)
          } else {
            setIsRunning(false)
            playBeep(1200, 0.5)
          }
        }
      }
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, isResting, currentExerciseIndex, exercises, soundEnabled])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentExerciseIndex(0)
    setTimeLeft(exercises[0].duration)
    setIsResting(false)
  }

  const handleSave = () => {
    setSaveStatus("saving")
    if (typeof window !== "undefined") {
      localStorage.setItem("workout-exercises", JSON.stringify(exercises))
    }
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 500)
  }

  // Reps Mode Functions
  const getCurrentDayWorkout = () => {
    return weeklySchedule.find(w => w.day === selectedDay)
  }

  const handleNextSet = () => {
    const currentWorkout = getCurrentDayWorkout()
    if (!currentWorkout) return

    const currentExercise = currentWorkout.exercises[currentRepExerciseIndex]
    
    playBeep(600, 0.2)

    if (currentSet < currentExercise.sets) {
      setCurrentSet(currentSet + 1)
    } else {
      if (currentRepExerciseIndex < currentWorkout.exercises.length - 1) {
        setCurrentRepExerciseIndex(currentRepExerciseIndex + 1)
        setCurrentSet(1)
      } else {
        playBeep(1200, 0.5)
        setIsRepWorkoutActive(false)
        setCurrentRepExerciseIndex(0)
        setCurrentSet(1)
      }
    }
  }

  const handleStartRepWorkout = () => {
    setIsRepWorkoutActive(true)
    setCurrentRepExerciseIndex(0)
    setCurrentSet(1)
  }

  const handleResetRepWorkout = () => {
    setIsRepWorkoutActive(false)
    setCurrentRepExerciseIndex(0)
    setCurrentSet(1)
  }

  const addExerciseToDay = (day: string) => {
    const newExercise: RepExercise = {
      name: "Novo Exercício",
      sets: 3,
      reps: 10,
      weight: ""
    }

    setWeeklySchedule(prev => {
      const dayIndex = prev.findIndex(w => w.day === day)
      if (dayIndex >= 0) {
        const updated = [...prev]
        updated[dayIndex].exercises.push(newExercise)
        return updated
      } else {
        return [...prev, { day, exercises: [newExercise] }]
      }
    })
  }

  const removeExerciseFromDay = (day: string, exerciseIndex: number) => {
    setWeeklySchedule(prev => {
      const dayIndex = prev.findIndex(w => w.day === day)
      if (dayIndex >= 0) {
        const updated = [...prev]
        updated[dayIndex].exercises.splice(exerciseIndex, 1)
        if (updated[dayIndex].exercises.length === 0) {
          updated.splice(dayIndex, 1)
        }
        return updated
      }
      return prev
    })
  }

  const updateExercise = (day: string, exerciseIndex: number, field: keyof RepExercise, value: any) => {
    setWeeklySchedule(prev => {
      const dayIndex = prev.findIndex(w => w.day === day)
      if (dayIndex >= 0) {
        const updated = [...prev]
        updated[dayIndex].exercises[exerciseIndex] = {
          ...updated[dayIndex].exercises[exerciseIndex],
          [field]: value
        }
        return updated
      }
      return prev
    })
  }

  const totalTime = exercises.reduce((acc, ex) => acc + ex.duration + ex.rest, 0)
  const currentExercise = exercises[currentExerciseIndex]
  const currentDayWorkout = getCurrentDayWorkout()
  const currentRepExercise = currentDayWorkout?.exercises[currentRepExerciseIndex]

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex gap-3">
          <button
            onClick={() => setWorkoutMode("timer")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              workoutMode === "timer"
                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            ⏱️ Treino por Tempo
          </button>
          <button
            onClick={() => setWorkoutMode("reps")}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              workoutMode === "reps"
                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            💪 Treino por Repetições
          </button>
        </div>
      </div>

      {/* Timer Mode */}
      {workoutMode === "timer" && (
        <>
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Cronômetro de Treino</h2>
                  <p className="text-purple-100 text-sm">Tempo total: {formatTime(totalTime)}</p>
                </div>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm"
              >
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="text-sm font-medium text-purple-100 mb-2">
                Exercício {currentExerciseIndex + 1} de {exercises.length}
              </div>
              <h3 className="text-3xl font-bold mb-2">{currentExercise.name}</h3>
              <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${
                isResting ? "bg-yellow-400/20 text-yellow-100" : "bg-white/20 text-white"
              }`}>
                {isResting ? "Descanso" : "Exercício"}
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="text-8xl sm:text-9xl font-bold mb-4 font-mono">
                {formatTime(timeLeft)}
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-1000 ease-linear"
                  style={{
                    width: `${(timeLeft / (isResting ? currentExercise.rest : currentExercise.duration)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="flex items-center gap-2 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-purple-50 transition-all hover:scale-105 shadow-lg"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Iniciar
                  </>
                )}
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold hover:bg-white/30 transition-all"
              >
                <RotateCcw className="w-5 h-5" />
                Reiniciar
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Lista de Exercícios</h3>
              <div className="flex items-center gap-2">
                {showSettings && (
                  <button
                    onClick={handleSave}
                    disabled={saveStatus !== "idle"}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      saveStatus === "saved"
                        ? "bg-green-500 text-white"
                        : saveStatus === "saving"
                        ? "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                        : "bg-purple-500 text-white hover:bg-purple-600"
                    }`}
                  >
                    {saveStatus === "saved" ? (
                      <>
                        <Check className="w-4 h-4" />
                        Salvo!
                      </>
                    ) : saveStatus === "saving" ? (
                      <>
                        <Save className="w-4 h-4 animate-pulse" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Salvar
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className={`p-2 rounded-lg transition-colors ${
                    showSettings
                      ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>

            {showSettings && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  💡 <strong>Dica:</strong> Suas alterações são salvas automaticamente. Clique em "Salvar" para confirmar manualmente.
                </p>
              </div>
            )}

            <div className="space-y-3">
              {exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    index === currentExerciseIndex
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {showSettings ? (
                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) => {
                            const updated = [...exercises]
                            updated[index].name = e.target.value
                            setExercises(updated)
                          }}
                          className="w-full px-2 py-1 bg-transparent border-b border-gray-300 dark:border-gray-600 focus:border-purple-500 outline-none font-medium text-gray-900 dark:text-gray-100"
                        />
                      ) : (
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {exercise.name}
                        </div>
                      )}
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {showSettings ? (
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                              Duração:
                              <input
                                type="number"
                                value={exercise.duration}
                                onChange={(e) => {
                                  const updated = [...exercises]
                                  updated[index].duration = parseInt(e.target.value) || 0
                                  setExercises(updated)
                                }}
                                className="w-16 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                              />
                              s
                            </label>
                            <label className="flex items-center gap-2">
                              Descanso:
                              <input
                                type="number"
                                value={exercise.rest}
                                onChange={(e) => {
                                  const updated = [...exercises]
                                  updated[index].rest = parseInt(e.target.value) || 0
                                  setExercises(updated)
                                }}
                                className="w-16 px-2 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded"
                              />
                              s
                            </label>
                          </div>
                        ) : (
                          <>
                            Duração: {formatTime(exercise.duration)} | Descanso: {formatTime(exercise.rest)}
                          </>
                        )}
                      </div>
                    </div>
                    {index === currentExerciseIndex && isRunning && (
                      <div className="ml-4">
                        <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {showSettings && (
              <button
                onClick={() => {
                  setExercises([
                    ...exercises,
                    { name: `Exercício ${exercises.length + 1}`, duration: 180, rest: 60 },
                  ])
                }}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:border-purple-500 hover:text-purple-500 dark:hover:text-purple-400 transition-all"
              >
                <Plus className="w-5 h-5" />
                Adicionar Exercício
              </button>
            )}
          </div>
        </>
      )}

      {/* Reps Mode */}
      {workoutMode === "reps" && (
        <>
          {/* Day Selector */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Agenda Semanal</h3>
              </div>
              <button
                onClick={() => setShowScheduleEditor(!showScheduleEditor)}
                className={`p-2 rounded-lg transition-colors ${
                  showScheduleEditor
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}
              >
                <Edit2 className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
              {DAYS_OF_WEEK.map((day) => {
                const hasWorkout = weeklySchedule.some(w => w.day === day)
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`py-3 px-2 rounded-lg font-medium transition-all text-sm ${
                      selectedDay === day
                        ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg"
                        : hasWorkout
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {day}
                    {hasWorkout && <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mx-auto mt-1" />}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Workout Display */}
          {currentDayWorkout && !showScheduleEditor ? (
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Treino de {selectedDay}</h2>
                    <p className="text-emerald-100 text-sm">{currentDayWorkout.exercises.length} exercícios</p>
                  </div>
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all backdrop-blur-sm"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
              </div>

              {isRepWorkoutActive && currentRepExercise ? (
                <>
                  <div className="text-center mb-8">
                    <div className="text-sm font-medium text-emerald-100 mb-2">
                      Exercício {currentRepExerciseIndex + 1} de {currentDayWorkout.exercises.length}
                    </div>
                    <h3 className="text-4xl font-bold mb-2">{currentRepExercise.name}</h3>
                    {currentRepExercise.weight && (
                      <div className="text-emerald-100 text-lg">
                        Carga: {currentRepExercise.weight}
                      </div>
                    )}
                  </div>

                  <div className="text-center mb-8">
                    <div className="text-6xl sm:text-8xl font-bold mb-4">
                      Série {currentSet}/{currentRepExercise.sets}
                    </div>
                    <div className="text-3xl sm:text-5xl font-bold text-emerald-100">
                      {currentRepExercise.reps} repetições
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden mt-6">
                      <div
                        className="h-full bg-white transition-all duration-300"
                        style={{
                          width: `${(currentSet / currentRepExercise.sets) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={handleNextSet}
                      className="flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-all hover:scale-105 shadow-lg"
                    >
                      {currentSet < currentRepExercise.sets ? "Próxima Série" : 
                       currentRepExerciseIndex < currentDayWorkout.exercises.length - 1 ? "Próximo Exercício" : "Finalizar"}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleResetRepWorkout}
                      className="flex items-center gap-2 px-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl font-bold hover:bg-white/30 transition-all"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Reiniciar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {currentDayWorkout.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white/10 backdrop-blur-sm rounded-xl"
                      >
                        <div className="font-bold text-lg">{exercise.name}</div>
                        <div className="text-emerald-100 text-sm mt-1">
                          {exercise.sets} séries × {exercise.reps} repetições
                          {exercise.weight && ` • ${exercise.weight}`}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleStartRepWorkout}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-all hover:scale-105 shadow-lg"
                  >
                    <Play className="w-5 h-5" />
                    Iniciar Treino
                  </button>
                </>
              )}
            </div>
          ) : !currentDayWorkout && !showScheduleEditor ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Calendar className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Nenhum treino programado
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Adicione exercícios para {selectedDay} clicando no botão de editar acima
                </p>
              </div>
            </div>
          ) : null}

          {/* Schedule Editor */}
          {showScheduleEditor && (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Editar Treino - {selectedDay}
              </h3>

              <div className="space-y-3 mb-4">
                {weeklySchedule
                  .find(w => w.day === selectedDay)
                  ?.exercises.map((exercise, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <input
                          type="text"
                          value={exercise.name}
                          onChange={(e) => updateExercise(selectedDay, index, "name", e.target.value)}
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg font-medium text-gray-900 dark:text-gray-100"
                          placeholder="Nome do exercício"
                        />
                        <button
                          onClick={() => removeExerciseFromDay(selectedDay, index)}
                          className="ml-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <label className="block">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Séries</span>
                          <input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(selectedDay, index, "sets", parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-gray-100"
                            min="1"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Repetições</span>
                          <input
                            type="number"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(selectedDay, index, "reps", parseInt(e.target.value) || 1)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-gray-100"
                            min="1"
                          />
                        </label>
                        <label className="block">
                          <span className="text-xs text-gray-600 dark:text-gray-400">Carga</span>
                          <input
                            type="text"
                            value={exercise.weight || ""}
                            onChange={(e) => updateExercise(selectedDay, index, "weight", e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-gray-100"
                            placeholder="Ex: 60kg"
                          />
                        </label>
                      </div>
                    </div>
                  ))}
              </div>

              <button
                onClick={() => addExerciseToDay(selectedDay)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all"
              >
                <Plus className="w-5 h-5" />
                Adicionar Exercício
              </button>
            </div>
          )}
        </>
      )}

      {/* Workout Suggestions */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-800">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
          💪 Sugestões de Treino para {profile.exercisePreference === "home" ? "Casa" : profile.exercisePreference === "gym" ? "Academia" : profile.exercisePreference === "outdoor" ? "Ar Livre" : "Você"}
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {profile.exercisePreference === "home" && (
            <>
              <li>• Flexões, agachamentos e prancha</li>
              <li>• Polichinelos e burpees</li>
              <li>• Abdominais e mountain climbers</li>
            </>
          )}
          {profile.exercisePreference === "gym" && (
            <>
              <li>• Treino de força com pesos</li>
              <li>• Esteira ou bicicleta ergométrica</li>
              <li>• Exercícios com máquinas</li>
            </>
          )}
          {profile.exercisePreference === "outdoor" && (
            <>
              <li>• Corrida ou caminhada</li>
              <li>• Ciclismo</li>
              <li>• Exercícios em parques</li>
            </>
          )}
          {profile.exercisePreference === "mixed" && (
            <>
              <li>• Combine treinos em casa e academia</li>
              <li>• Alterne entre indoor e outdoor</li>
              <li>• Varie os tipos de exercício</li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
