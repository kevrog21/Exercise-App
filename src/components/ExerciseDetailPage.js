import { useParams } from 'react-router-dom'
import BackButton from './BackButton'

export default function ExerciseDetailPage() {

    const { id } = useParams()

    return (
        <main>
            <div className="page-margin-top">
                <BackButton />
                <div>Detail for exercise {id}</div>
            </div>
        </main>
    )
}