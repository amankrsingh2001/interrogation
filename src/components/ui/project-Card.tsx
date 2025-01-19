'use client'



import { ExternalLink, Github, Code2 } from 'lucide-react'
import { motion } from 'framer-motion';

interface ProjectCardProps {
  name: string
  description: string
  liveLink: string
  repoLink: string
  languages?: string[]
  createdAt: string
}

export default function ProjectCard({
  name,
  description,
  liveLink,
  repoLink,
  languages = [],
  createdAt
}: ProjectCardProps) {


  return (
  <div className='max-w-sm rounded-lg overflow-hidden shadow-lg px-4 py-2 bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out'>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800 dark:text-white">{name}</div>
        <p className="text-gray-700 dark:text-gray-300 text-base mb-4">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
          >
            <ExternalLink size={18} className="mr-1" />
            Live Demo
          </a>
          <a
            href={repoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <Github size={18} className="mr-1" />
            Repository
          </a>
        </div>
        {languages.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Technologies:</h3>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, index) => (
                <motion.span
                  key={index}
                  className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {lang}
                </motion.span>
              ))}
            </div>
          </div>
        )}
        <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <Code2 size={16} className="mr-1" />
          Created: {new Date(createdAt).toLocaleDateString()}
        </div>
      </div>

      </div>
  
  )
}

