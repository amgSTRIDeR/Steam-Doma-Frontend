import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type Genre } from '../../types/genres';
import Icon from '../../components/Icon/Icon';

interface SidebarGenresProps {
  genres: Genre[];
}

export default function SidebarGenres({ genres }: SidebarGenresProps) {
  const [expandedGenre, setExpandedGenre] = useState<string | null>(null);

  const toggleGenre = (id: string) => {
    setExpandedGenre((prev) => (prev === id ? null : id));
  };

  const { t } = useTranslation();
  return (
    <div className="sidebar__item">
      <h2 className="sidebar__title">{t('sidebar.genresTitle')}</h2>
      <ul className="sidebar__list">
        {genres.map((genre) => {
          const isExpanded = expandedGenre === genre.name;
          const hasSubgenres = Boolean(genre.subgenres?.length);

          return (
            <li className="sidebar__list-item" key={genre.name}>
              <button
                className="sidebar__list-btn"
                type="button"
                aria-expanded={hasSubgenres ? isExpanded : undefined}
                onClick={() => toggleGenre(genre.name)}
              >
                {hasSubgenres && (
                  <Icon
                    name="icon-chevron-right"
                    className={`sidebar__icon ${isExpanded ? 'sidebar__icon_expanded' : ''}`}
                  />
                )}

                <span className="sidebar__span">{t(`genres.${genre.name}`)}</span>
              </button>

              {hasSubgenres && isExpanded && (
                <ul className="sidebar__sublist">
                  {genre.subgenres?.map((subgenre) => (
                    <li className="sidebar__subitem" key={subgenre}>
                      <button className="sidebar__subbutton" type="button">
                        {subgenre}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
