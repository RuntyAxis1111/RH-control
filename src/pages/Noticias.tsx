import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { 
  NewspaperIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  XMarkIcon,
  PencilSquareIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';
import { supabase } from '../lib/supabaseClient';
import ReactMarkdown from 'react-markdown';
import dayjs from 'dayjs';

interface NewsUpdate {
  id: string;
  created_at: string;
  updated_at: string;
  published_for: string;
  title: string;
  content: string;
  type: 'slide' | 'texto';
  is_active: boolean;
}

const Noticias: React.FC = () => {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsUpdate | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    published_for: dayjs().format('YYYY-MM-01'),
    title: '',
    content: '',
    type: 'slide' as 'slide' | 'texto',
    is_active: true
  });

  const { data: noticias = [], isLoading, error, refetch } = useQuery({
    queryKey: ['news_updates'],
    queryFn: async (): Promise<NewsUpdate[]> => {
      const { data, error } = await supabase
        .from('news_updates')
        .select('*')
        .order('published_for', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  // Real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('news_updates_channel')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'news_updates' 
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['news_updates'] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      if (editingNews) {
        const { error } = await supabase
          .from('news_updates')
          .update(data)
          .eq('id', editingNews.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('news_updates')
          .insert([data]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news_updates'] });
      handleCloseModal();
      showToast(editingNews ? 'Noticia actualizada ✔️' : 'Noticia creada ✔️', 'success');
    },
    onError: (error) => {
      console.error('Error saving news:', error);
      showToast('Error al guardar la noticia', 'error');
    }
  });

  // Toggle active mutation
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('news_updates')
        .update({ is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news_updates'] });
      showToast('Estado actualizado ✔️', 'success');
    },
    onError: (error) => {
      console.error('Error toggling active:', error);
      showToast('Error al cambiar estado', 'error');
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('news_updates')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news_updates'] });
      setShowDeleteModal(null);
      showToast('Noticia eliminada ✔️', 'success');
    },
    onError: (error) => {
      console.error('Error deleting news:', error);
      showToast('Error al eliminar la noticia', 'error');
    }
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const filteredNoticias = noticias.filter(noticia =>
    noticia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewNoticia = () => {
    setEditingNews(null);
    setFormData({
      published_for: dayjs().format('YYYY-MM-01'),
      title: '',
      content: '',
      type: 'slide',
      is_active: true
    });
    setShowModal(true);
  };

  const handleEditNoticia = (noticia: NewsUpdate) => {
    setEditingNews(noticia);
    setFormData({
      published_for: noticia.published_for,
      title: noticia.title,
      content: noticia.content,
      type: noticia.type,
      is_active: noticia.is_active
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNews(null);
    setFormData({
      published_for: dayjs().format('YYYY-MM-01'),
      title: '',
      content: '',
      type: 'slide',
      is_active: true
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    // Validate Google Slides URL if type is slide
    if (formData.type === 'slide') {
      if (!formData.content.includes('docs.google.com/presentation')) {
        showToast('La URL debe ser de Google Slides (docs.google.com/presentation)', 'error');
        return;
      }
    }

    saveMutation.mutate(formData);
  };

  const handleExportCSV = async () => {
    try {
      const { data, error } = await supabase
        .from('news_updates')
        .select('*')
        .order('published_for', { ascending: false });
      
      if (error) throw error;

      // Create CSV content
      const headers = ['ID', 'Mes', 'Título', 'Tipo', 'Contenido', 'Activa', 'Creado', 'Actualizado'];
      const csvContent = [
        headers.join(','),
        ...data.map(row => [
          row.id,
          dayjs(row.published_for).format('YYYY-MM'),
          `"${row.title.replace(/"/g, '""')}"`,
          row.type,
          `"${row.content.replace(/"/g, '""')}"`,
          row.is_active ? 'Sí' : 'No',
          dayjs(row.created_at).format('DD/MM/YYYY HH:mm'),
          dayjs(row.updated_at).format('DD/MM/YYYY HH:mm')
        ].join(','))
      ].join('\n');

      // Download CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `noticias_${dayjs().format('YYYY-MM-DD')}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showToast('CSV descargado correctamente ✔️', 'success');
    } catch (error) {
      console.error('Error exporting CSV:', error);
      showToast('Error al exportar CSV', 'error');
    }
  };

  const extractSlideId = (url: string) => {
    const match = url.match(/\/presentation\/d\/([a-zA-Z0-9-_]+)/);
    return match ? match[1] : null;
  };

  const renderContent = (noticia: NewsUpdate) => {
    if (noticia.type === 'slide') {
      const slideId = extractSlideId(noticia.content);
      if (slideId) {
        const embedUrl = `https://docs.google.com/presentation/d/${slideId}/embed?start=false&loop=false&delayms=3000`;
        return (
          <iframe
            src={embedUrl}
            width="100%"
            height="480"
            allowFullScreen
            className="rounded-lg border"
            style={{ borderColor: theme.tableBorder }}
          />
        );
      }
      return (
        <div className="p-4 rounded-lg" style={{ backgroundColor: theme.surfaceAlt }}>
          <p style={{ color: theme.danger }}>URL de Google Slides inválida</p>
        </div>
      );
    } else {
      return (
        <div 
          className="prose max-w-none p-4 rounded-lg"
          style={{ 
            backgroundColor: theme.surfaceAlt,
            color: theme.textPrimary
          }}
        >
          <ReactMarkdown>{noticia.content}</ReactMarkdown>
        </div>
      );
    }
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
        <div className="px-6 py-4 rounded-xl" style={{
          backgroundColor: `${theme.danger}20`,
          border: `1px solid ${theme.danger}30`,
          color: theme.danger
        }}>
          Error al cargar las noticias: {(error as Error).message}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" style={{ backgroundColor: theme.background }}>
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <NewspaperIcon className="h-8 w-8" style={{ color: theme.primaryAccent }} />
            <div>
              <h1 className="text-3xl font-extrabold" style={{ color: theme.textPrimary }}>
                Noticias
              </h1>
              <p style={{ color: theme.textSecondary }}>
                {filteredNoticias.length} noticias en total
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border font-medium transition-colors hover:opacity-90"
              style={{ 
                borderColor: theme.tableBorder,
                color: theme.textPrimary,
                backgroundColor: theme.background
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.surfaceAlt}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = theme.background}
            >
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span>Descargar CSV</span>
            </button>
            <button
              onClick={handleNewNoticia}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium transition-colors hover:opacity-90"
              style={{ backgroundColor: theme.primaryAccent }}
            >
              <PlusIcon className="h-4 w-4" />
              <span>Nueva noticia</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: theme.textSecondary }} />
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent"
            style={{
              backgroundColor: theme.background,
              borderColor: theme.tableBorder,
              color: theme.textPrimary
            }}
          />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        className="rounded-xl overflow-hidden mb-8"
        style={{
          backgroundColor: theme.background,
          border: `1px solid ${theme.tableBorder}`
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isLoading ? (
          <div className="p-8">
            <div className="animate-pulse">
              <div className="h-4 rounded w-1/4 mb-4" style={{ backgroundColor: theme.tableBorder }}></div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 rounded" style={{ backgroundColor: theme.surfaceAlt }}></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: theme.tableHeaderBg }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                    Mes
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                    Título
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                    Tipo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                    Activa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textSecondary }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: theme.tableBorder }}>
                {filteredNoticias.map((noticia, index) => (
                  <motion.tr
                    key={noticia.id}
                    className="transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.tableHeaderBg}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: theme.textPrimary }}>
                      {dayjs(noticia.published_for).format('MMM YYYY')}
                    </td>
                    <td className="px-6 py-4 text-sm" style={{ color: theme.textPrimary }}>
                      {noticia.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: noticia.type === 'slide' ? `${theme.info}20` : `${theme.success}20`,
                          color: noticia.type === 'slide' ? theme.info : theme.success
                        }}
                      >
                        {noticia.type === 'slide' ? 'Slide' : 'Texto'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span 
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: noticia.is_active ? `${theme.success}20` : `${theme.danger}20`,
                          color: noticia.is_active ? theme.success : theme.danger
                        }}
                      >
                        {noticia.is_active ? '✅' : '❌'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEditNoticia(noticia)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Editar"
                        >
                          <PencilSquareIcon className="h-4 w-4" style={{ color: theme.primaryAccent }} />
                        </button>
                        <button
                          onClick={() => toggleActiveMutation.mutate({ id: noticia.id, is_active: !noticia.is_active })}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title={noticia.is_active ? "Ocultar" : "Mostrar"}
                        >
                          {noticia.is_active ? (
                            <EyeSlashIcon className="h-4 w-4" style={{ color: theme.warning }} />
                          ) : (
                            <EyeIcon className="h-4 w-4" style={{ color: theme.success }} />
                          )}
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(noticia.id)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Eliminar"
                        >
                          <TrashIcon className="h-4 w-4" style={{ color: theme.danger }} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Content Display */}
      <div className="space-y-8">
        {filteredNoticias
          .filter(noticia => noticia.is_active)
          .map((noticia) => (
            <motion.div
              key={noticia.id}
              className="rounded-xl p-6"
              style={{
                backgroundColor: theme.background,
                border: `1px solid ${theme.tableBorder}`
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4">
                <h2 className="text-xl font-bold mb-2" style={{ color: theme.textPrimary }}>
                  {noticia.title}
                </h2>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  {dayjs(noticia.published_for).format('MMMM YYYY')}
                </p>
              </div>
              {renderContent(noticia)}
            </motion.div>
          ))}
      </div>

      {/* New/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
            />
            
            <motion.div
              className="relative w-full max-w-2xl rounded-lg shadow-xl"
              style={{ 
                backgroundColor: theme.background,
                border: `1px solid ${theme.tableBorder}`
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.tableBorder }}>
                <h2 className="text-xl font-semibold" style={{ color: theme.textPrimary }}>
                  {editingNews ? 'Editar Noticia' : 'Nueva Noticia'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: theme.textSecondary }}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Mes *
                  </label>
                  <input
                    type="month"
                    required
                    value={formData.published_for.substring(0, 7)}
                    onChange={(e) => setFormData(prev => ({ ...prev, published_for: e.target.value + '-01' }))}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Título *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{ 
                      backgroundColor: theme.background,
                      borderColor: theme.tableBorder,
                      color: theme.textPrimary
                    }}
                    placeholder="Título de la noticia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Tipo *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="slide"
                        checked={formData.type === 'slide'}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'slide' | 'texto' }))}
                        className="mr-2"
                      />
                      <span style={{ color: theme.textPrimary }}>Slide</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="texto"
                        checked={formData.type === 'texto'}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'slide' | 'texto' }))}
                        className="mr-2"
                      />
                      <span style={{ color: theme.textPrimary }}>Texto</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                    Contenido *
                  </label>
                  {formData.type === 'slide' ? (
                    <input
                      type="url"
                      required
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: theme.background,
                        borderColor: theme.tableBorder,
                        color: theme.textPrimary
                      }}
                      placeholder="https://docs.google.com/presentation/d/..."
                    />
                  ) : (
                    <textarea
                      required
                      rows={6}
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{ 
                        backgroundColor: theme.background,
                        borderColor: theme.tableBorder,
                        color: theme.textPrimary
                      }}
                      placeholder="Contenido en Markdown..."
                    />
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium" style={{ color: theme.textPrimary }}>
                    Activo
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 rounded-lg border transition-colors"
                    style={{ 
                      borderColor: theme.tableBorder,
                      color: theme.textSecondary
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={saveMutation.isPending || !formData.title.trim() || !formData.content.trim()}
                    className="px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                    style={{ backgroundColor: theme.primaryAccent }}
                  >
                    {saveMutation.isPending ? 'Guardando...' : (editingNews ? 'Actualizar' : 'Crear')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(null)}
            />
            
            <motion.div
              className="relative w-full max-w-md rounded-lg shadow-xl"
              style={{ 
                backgroundColor: theme.background,
                border: `1px solid ${theme.tableBorder}`
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>
                  ¿Eliminar noticia?
                </h3>
                <p className="mb-6" style={{ color: theme.textSecondary }}>
                  Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowDeleteModal(null)}
                    className="px-4 py-2 rounded-lg border transition-colors"
                    style={{ 
                      borderColor: theme.tableBorder,
                      color: theme.textSecondary
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => deleteMutation.mutate(showDeleteModal)}
                    disabled={deleteMutation.isPending}
                    className="px-4 py-2 rounded-lg text-white transition-colors disabled:opacity-50"
                    style={{ backgroundColor: theme.danger }}
                  >
                    {deleteMutation.isPending ? 'Eliminando...' : 'Eliminar'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Noticias;