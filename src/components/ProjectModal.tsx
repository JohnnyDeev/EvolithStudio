import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

export interface Project {
  id: number
  title: string
  tag: string
  tagClass: string
  shortDesc: string
  fullDesc: string
  features: string[]
  techs: string[]
  icon?: string
  image?: string
}

interface ModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>
              <X size={18} />
            </button>

            {project.image && (
              <div className="modal-image-container">
                <img src={project.image} alt={project.title} className="modal-image" />
              </div>
            )}

            <div className="modal-header">
              <span className={`modal-tag ${project.tagClass}`}>{project.tag}</span>
              <h3 className="modal-title">{project.title}</h3>
            </div>

            <div className="modal-body">
              <p className="modal-description">{project.fullDesc}</p>

              <div className="modal-features">
                <h4>Funcionalidades</h4>
                <div className="modal-feature-list">
                  {project.features.map((feat, i) => (
                    <div key={i} className="modal-feature-item">
                      <Check size={16} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-features">
                <h4>Tecnologias</h4>
                <div className="modal-techs">
                  {project.techs.map((tech, i) => (
                    <span key={i} className="modal-tech-badge">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
