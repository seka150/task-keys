import React, { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const { initialData, sorting } = props;

    const [items, setItems] = useState<IItem[]>(initialData);

    const [editingId, setEditingId] = useState<number | null>(null);
    
    const [editValue, setEditValue] = useState<string>('');

    const sortedData = [...items].sort((a, b) => {
        if (sorting === 'ASC') {
            return a.id - b.id;
        } else {
            return b.id - a.id;
        }
    });

    const handleStartEdit = (item: IItem) => {
        setEditingId(item.id);
        setEditValue(item.name);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === 'Enter') {
            setItems(prevItems => 
                prevItems.map(item => 
                    item.id === id ? { ...item, name: editValue } : item
                )
            );
            setEditingId(null);
        } else if (e.key === 'Escape') {
            // Отмена по Escape
            setEditingId(null);
        }
    };

    return (
        <ul>
            {sortedData.map((item) => (
                <li key={item.id}>
                    {editingId === item.id ? (
                        <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, item.id)}
                            autoFocus
                        />
                    ) : (
                        <span 
                            onClick={() => handleStartEdit(item)} 
                            style={{ cursor: 'pointer' }}
                        >
                            {item.name}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}