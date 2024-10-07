import { useParams } from 'react-router-dom'

export default function ExerciseDetailPage() {

    const { id } = useParams()

    return (
        <main>
            <div className="page-margin-top">
                Detail for exercise {id}
            </div>
        </main>
    )
}