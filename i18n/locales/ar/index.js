export default {
    globals: {
        task: {
            statuses: {
                todo: 'للقيام به',
                in_progress: 'في تَقَدم',
                done: 'منتهي'
            },
            priorities: {
                low: 'دنىء',
                medium: 'متوسط',
                high: 'عالي'
            }
        }
    },
    components:{
        autocomplete:{
            noResultsFound: 'لم يتم العثور على نتائج.',
        }
    },
    confirmationModal: {
        buttons: {
            yes: 'نعم',
            no: 'لا'
        }
    },
    navbar: {
        overview: 'الرئيسية',
        projects: 'المشاريع',
        tasks: 'المهام',
        users: 'المستخدمين',
        settings: 'الإعدادات'
    },
    overview: {
        smallCards: {
            projects: {
                title: 'المشاريع',
                time: 'كل الوقت'
            },
            tasks: {
                title: 'المهام',
                time: 'آخر 7 أيام'
            },
            doneTasks: {
                title: 'المهام المنجزة',
                time: 'آخر 7 أيام'
            }
        },
        charts: {
            tasksCount: {
                title: 'عدد المهام'
            },
            tasksDoneCount: {
                title: 'عدد المهام المنجزة'
            }
        }
    },
    signup: {
        form: {
            fields: {
                full_name: {
                    title: 'الاسم الكامل'
                },
                email: {
                    title: 'البريد إلكتروني'
                },
                password: {
                    title: 'كلمة المرور'
                },
                password_confirmation: {
                    title: 'تأكيد كلمة المرور'
                }
            }

        }
    },
    signin: {
        title: 'Welcome Back',
        subTitle: 'Sign in to your account',
        form: {
            fields: {
                email: {
                    title: 'البريد إلكتروني'
                },
                password: {
                    title: 'كلمة المرور'
                }
            }

        }
    },
    project: {
        title: 'المشاريع',
        buttons: {
            newProjects: 'إنشاء مشروع'
        },
        item: {
            buttons: {
                edit: 'تعديل',
                delete: 'حذف'
            },
            progress: 'التقدم',
            team: 'الفريق',
            due_date: 'تاريخ الانتهاء'
        },
        dialogs: {
            form: {
                title: {
                    create: 'إنشاء مشروع',
                    edit: 'تعديل مشروع',
                },
                fields: {
                    title: {
                        title: 'العنوان',
                        placeholder: 'أدخل عنوان المشروع',
                    },
                    due_date: {
                        title: 'تاريخ الانتهاء'
                    },
                    description: {
                        title: 'الوصف',
                        placeholder: 'قم بوصف مشروعك',
                    }
                },
                buttons: {
                    create: 'إنشاء',
                    save: 'حفظ',
                    cancel: 'إلغاء',
                }
            },
            delete: {
                title: 'حذف المشروع',
                description: 'هل أنت متأكد أنك تريد حذف هذا المشروع؟'
            }
        }
    },
    task: {
        title: 'المهام',
        buttons: {
            title: 'إنشاء مهمة',
        },
        item:{
            buttons: {
                edit: 'تعديل',
                delete: 'حذف'
            },
            project: 'المشروع',
            due_date: 'تاريخ الانتهاء'
        },
        dialogs: {
            form: {
                title:{
                    create: 'إنشاء مهمة',
                    edit: 'تعديل مهمة',
                },
                fields: {
                    project: {
                        title: 'المشروع',
                        placeholder: 'البحث في المشاريع'
                    },
                    member: {
                        title: 'مُخصص للعضو',
                        placeholder: 'البحث في الأعضاء'
                    },
                    due_date: {
                        title: 'تاريخ الانتهاء',
                    },
                    title: {
                        title: 'العنوان',
                        placeholder: 'أدخل العنوان'
                    },
                    priority: {
                        title: 'الأولوية',
                    },
                    description: {
                        title: 'الوصف',
                        placeholder: 'صف المهمة'
                    }
                },
                buttons: {
                    create: 'إنشاء',
                    save: 'حفظ',
                    cancel: 'إلغاء',
                }
            },
            delete: {
                title: 'حذف المهمة',
                description: 'هل أنت متأكد أنك تريد حذف هذه المهمة؟',
            }
        }
    }
}